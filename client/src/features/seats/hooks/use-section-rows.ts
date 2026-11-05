import { useQuery } from '@tanstack/react-query'

import { getSeats, seatKeys } from '@/features/seats/api/seats-api'
import type { Seat, SeatRow } from '@/features/seats/types'

const toRows = (seats: Seat[], section: string): SeatRow[] => {
  const rows: SeatRow[] = []

  for (const seat of seats) {
    if (seat.section !== section) continue

    const last = rows.at(-1)
    if (last?.label === seat.rowLabel) {
      last.seats.push(seat)
    } else {
      rows.push({ label: seat.rowLabel, seats: [seat] })
    }
  }

  return rows
}

export const useSectionRows = (eventId: string, section: string) =>
  useQuery({
    queryKey: seatKeys.byEvent(eventId),
    queryFn: () => getSeats(eventId),
    select: (seats) => toRows(seats, section),
    refetchInterval: 5000,
  })
