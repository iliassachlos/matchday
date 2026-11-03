package com.matchday.ticket.config;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authorization.AuthenticatedAuthorizationManager;
import org.springframework.security.authorization.AuthorizationDecision;
import org.springframework.security.authorization.AuthorizationManager;
import org.springframework.security.authorization.AuthorizationManagers;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.oauth2.server.resource.authentication.JwtGrantedAuthoritiesConverter;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.access.intercept.RequestAuthorizationContext;

@Configuration
@EnableWebSecurity
@EnableConfigurationProperties(JwtKeyProperties.class)
public class SecurityConfig {

    public static final String SERVICE_TOKEN_HEADER = "X-Service-Token";

    /**
     * Create a JwtDecoder bean that uses the public key from the application
     * properties to decode JWTs.
     * 
     * @param keys - The JwtKeyProperties bean that contains the public key
     * @return A JwtDecoder that uses the public key to decode JWTs
     */
    @Bean
    JwtDecoder jwtDecoder(JwtKeyProperties keys) {
        return NimbusJwtDecoder.withPublicKey(keys.publicKey()).build();
    }

    /**
     * Create a JwtAuthenticationConverter bean that converts JWTs into Spring
     * Security
     * 
     * @return A JwtAuthenticationConverter that converts JWTs into Spring Security
     */
    @Bean
    JwtAuthenticationConverter jwtAuthenticationConverter() {
        JwtGrantedAuthoritiesConverter authorities = new JwtGrantedAuthoritiesConverter();

        authorities.setAuthoritiesClaimName("roles");
        authorities.setAuthorityPrefix("");

        JwtAuthenticationConverter converter = new JwtAuthenticationConverter();

        converter.setJwtGrantedAuthoritiesConverter(authorities);

        return converter;
    }

    /**
     * Allow a request only if it carries the service token shared with order-service.
     * Compared in constant time, so response timing cannot reveal how much of a guess
     * was right.
     *
     * @param serviceToken - The token order-service sends
     * @return An AuthorizationManager that checks the service token header
     */
    private static AuthorizationManager<RequestAuthorizationContext> fromOrderService(String serviceToken) {
        byte[] expected = serviceToken.getBytes(StandardCharsets.UTF_8);

        return (authentication, context) -> {
            String presented = context.getRequest().getHeader(SERVICE_TOKEN_HEADER);

            return new AuthorizationDecision(presented != null
                    && MessageDigest.isEqual(expected, presented.getBytes(StandardCharsets.UTF_8)));
        };
    }

    /**
     * Configure the security filter chain for the application
     *
     * @param http         - The HttpSecurity object to configure
     * @param serviceToken - The token that proves a request comes from order-service
     * @return A SecurityFilterChain that defines the security configuration for the
     *         application
     * @throws Exception
     */
    @Bean
    SecurityFilterChain securityFilterChain(
            HttpSecurity http,
            @Value("${matchday.internal.service-token}") String serviceToken) throws Exception {
        return http.csrf(csrf -> csrf.disable())
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/actuator/health", "/actuator/prometheus")
                        .permitAll()
                        .requestMatchers("/swagger-ui/**", "/swagger-ui.html", "/v3/api-docs/**")
                        .permitAll()
                        .requestMatchers("/error")
                        .permitAll()
                        // Gate staff only; ROLE_ADMIN stands in for a dedicated staff role
                        .requestMatchers(HttpMethod.POST, "/api/v1/tickets/scan")
                        .hasRole("ADMIN")
                        // Only order-service sells, after charging: the buyer's token says who
                        // buys, the service token proves it is not the buyer calling directly
                        .requestMatchers(HttpMethod.POST, "/api/v1/seats/*/sell")
                        .access(AuthorizationManagers.allOf(
                                AuthenticatedAuthorizationManager.authenticated(),
                                fromOrderService(serviceToken)))
                        .anyRequest().authenticated())
                .oauth2ResourceServer(
                        oauth2 -> oauth2.jwt(jwt -> jwt.jwtAuthenticationConverter(jwtAuthenticationConverter())))
                .build();
    }
}
