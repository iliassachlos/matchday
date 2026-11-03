package com.matchday.ticket.dto;

import java.time.Instant;
import java.util.UUID;

import com.matchday.ticket.entity.TicketStatus;

public record MyTicketResponse(
        UUID ticketId,
        TicketStatus status,
        String code,
        String matchName,
        String venueName,
        Instant startsAt,
        String section,
        String rowLabel,
        int seatNumber,
        Instant usedAt
    ) {}
