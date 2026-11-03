package com.matchday.ticket.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.matchday.ticket.dto.MyTicketResponse;
import com.matchday.ticket.dto.ScanRequest;
import com.matchday.ticket.dto.TicketDetails;
import com.matchday.ticket.service.TicketService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/tickets")
@RequiredArgsConstructor
public class TicketController {

    private final TicketService ticketService;

    @GetMapping("/me")
    public List<MyTicketResponse> listMine(@AuthenticationPrincipal Jwt jwt) {
        return ticketService.listMine(UUID.fromString(jwt.getSubject()));
    }

    /**
     * Gate scan. Staff only (see SecurityConfig): 200 admits the holder, 409 means the
     * ticket was already used, 404 means the code is forged or unknown.
     */
    @PostMapping("/scan")
    public TicketDetails scan(@Valid @RequestBody ScanRequest request) {
        return ticketService.admit(request.code());
    }
}
