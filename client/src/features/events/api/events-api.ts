import { apiClient } from '@/shared/api/client'
import type { EventSummary } from '@/features/events/types'

export const eventKeys = {
  all: ['events'],
}

export const getEvents = async (): Promise<EventSummary[]> => {
  const { data } = await apiClient.get('/events')
  return data
}
