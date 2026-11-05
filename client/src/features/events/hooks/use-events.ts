import { useQuery } from '@tanstack/react-query'

import { eventKeys, getEvents } from '@/features/events/api/events-api'

export const useEvents = () =>
  useQuery({
    queryKey: eventKeys.all,
    queryFn: getEvents,
    select: (events) => events.filter((event) => Date.parse(event.startsAt) > Date.now()),
    refetchInterval: 15_000,
  })
