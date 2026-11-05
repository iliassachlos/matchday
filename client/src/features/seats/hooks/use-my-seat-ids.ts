import { useQuery } from '@tanstack/react-query'

import { getMySeats, seatKeys } from '@/features/seats/api/seats-api'

export const useMySeatIds = () =>
  useQuery({
    queryKey: seatKeys.mine,
    queryFn: getMySeats,
    select: (seats) => new Set(seats.map((seat) => seat.id)),
  })
