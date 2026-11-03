package com.matchday.ticket;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.jwt;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.time.Instant;
import java.util.UUID;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.RequestPostProcessor;

import com.jayway.jsonpath.JsonPath;
import com.matchday.ticket.dto.OrderPaidEvent;
import com.matchday.ticket.entity.Event;
import com.matchday.ticket.entity.Seat;
import com.matchday.ticket.entity.Venue;
import com.matchday.ticket.repository.EventRepository;
import com.matchday.ticket.repository.SeatRepository;
import com.matchday.ticket.repository.TicketRepository;
import com.matchday.ticket.repository.VenueRepository;
import com.matchday.ticket.service.TicketCodeService;
import com.matchday.ticket.service.TicketService;

class MyTicketsTest extends IntegrationTestBase {

    private static final UUID MARIA = UUID.randomUUID();
    private static final UUID NIKOS = UUID.randomUUID();

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private TicketService ticketService;

    @Autowired
    private TicketCodeService ticketCodeService;

    @Autowired
    private TicketRepository ticketRepository;

    @Autowired
    private SeatRepository seatRepository;

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private VenueRepository venueRepository;

    private UUID ticketId;

    @BeforeEach
    void setUp() {
        ticketRepository.deleteAllInBatch();
        seatRepository.deleteAllInBatch();
        eventRepository.deleteAllInBatch();
        venueRepository.deleteAllInBatch();

        Venue venue = venueRepository.save(Venue.create("OAKA", "Athens"));
        Event event = eventRepository.save(
                Event.create(venue, "Greece vs Netherlands", Instant.parse("2026-11-12T19:45:00Z")));

        // A seat Maria has bought, and the ticket issued for it
        UUID orderId = UUID.randomUUID();
        Seat seat = Seat.create(event, "14", "8", 23, 4500L);
        seat.reserveFor(MARIA, Instant.now().plusSeconds(600));
        seat.sellTo(orderId);
        UUID seatId = seatRepository.save(seat).getId();

        ticketId = ticketService.issue(
                new OrderPaidEvent(orderId, MARIA, "maria@test.gr", seatId, 4500, Instant.now())).getId();
    }

    private RequestPostProcessor as(UUID userId) {
        return jwt().jwt(builder -> builder.subject(userId.toString()));
    }

    @Test
    @DisplayName("Maria sees her ticket, with the seat and a QR code the gate accepts")
    void holderSeesTheirTicket() throws Exception {
        String body = mockMvc.perform(get("/api/v1/tickets/me").with(as(MARIA)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(1))
                .andExpect(jsonPath("$[0].ticketId").value(ticketId.toString()))
                .andExpect(jsonPath("$[0].status").value("VALID"))
                .andExpect(jsonPath("$[0].matchName").value("Greece vs Netherlands"))
                .andExpect(jsonPath("$[0].venueName").value("OAKA"))
                .andExpect(jsonPath("$[0].section").value("14"))
                .andExpect(jsonPath("$[0].rowLabel").value("8"))
                .andExpect(jsonPath("$[0].seatNumber").value(23))
                .andReturn().getResponse().getContentAsString();

        String code = JsonPath.read(body, "$[0].code");
        assertThat(ticketCodeService.verify(code)).contains(ticketId);
    }

    @Test
    @DisplayName("Nikos does not see Maria's ticket")
    void otherUserSeesNothing() throws Exception {
        mockMvc.perform(get("/api/v1/tickets/me").with(as(NIKOS)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(0));
    }

    @Test
    @DisplayName("listing tickets without a token gives 401")
    void anonymousIsUnauthorized() throws Exception {
        mockMvc.perform(get("/api/v1/tickets/me")).andExpect(status().isUnauthorized());
    }
}
