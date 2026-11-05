import { apiClient } from '@/shared/api/client'
import type { Seat } from '@/features/seats/types'

export const seatKeys = {
  byEvent: (eventId: string) => ['events', eventId, 'seats'],
  mine: ['seats', 'me'],
}

export const getSeats = async (eventId: string): Promise<Seat[]> => {
  const { data } = await apiClient.get(`/events/${eventId}/seats`)
  return data
}

export const getMySeats = async (): Promise<Seat[]> => {
  const { data } = await apiClient.get('/seats/me')
  return data
}
