import { useQuery } from '@tanstack/react-query'

import { eventKeys, getEvents } from '@/features/events/api/events-api'

export const useEvent = (eventId: string) =>
  useQuery({
    queryKey: eventKeys.all,
    queryFn: getEvents,
    select: (events) => events.find((event) => event.id === eventId) ?? null,
  })
