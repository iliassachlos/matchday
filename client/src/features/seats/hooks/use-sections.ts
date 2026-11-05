import { useQuery } from '@tanstack/react-query'

import { getSeats, seatKeys } from '@/features/seats/api/seats-api'
import type { Seat, SectionSummary } from '@/features/seats/types'

const toSections = (seats: Seat[]): SectionSummary[] => {
  const byName = new Map<string, SectionSummary>()

  for (const seat of seats) {
    const section = byName.get(seat.section) ?? {
      name: seat.section,
      priceCents: seat.priceCents,
      totalSeats: 0,
      availableSeats: 0,
    }

    section.totalSeats += 1
    if (seat.status === 'AVAILABLE') section.availableSeats += 1
    section.priceCents = Math.min(section.priceCents, seat.priceCents)

    byName.set(seat.section, section)
  }

  return [...byName.values()].sort((a, b) => a.name.localeCompare(b.name, 'el', { numeric: true }))
}

export const useSections = (eventId: string) =>
  useQuery({
    queryKey: seatKeys.byEvent(eventId),
    queryFn: () => getSeats(eventId),
    select: toSections,
    refetchInterval: 5000,
  })
