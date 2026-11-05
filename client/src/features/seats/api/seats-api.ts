import { apiClient } from '@/shared/api/client'
import type { Seat } from '@/features/seats/types'

export const seatKeys = {
  byEvent: (eventId: string) => ['events', eventId, 'seats'],
}

export const getSeats = async (eventId: string): Promise<Seat[]> => {
  const { data } = await apiClient.get(`/events/${eventId}/seats`)
  return data
}
