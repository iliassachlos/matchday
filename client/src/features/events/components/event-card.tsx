import { ChevronRightIcon, MapPinIcon } from 'lucide-react'
import { Link } from 'react-router'

import type { EventSummary } from '@/features/events/types'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card'
import { formatKickoff } from '@/shared/lib/format'
import { cn } from '@/shared/lib/utils'

type Props = {
  event: EventSummary
}

export const EventCard = ({ event }: Props) => {
  const isSoldOut = event.availableSeats === 0

  const card = (
    <Card
      className={cn(
        'h-full',
        isSoldOut ? 'opacity-60' : 'transition-shadow group-hover:ring-foreground/30',
      )}
    >
      <CardHeader>
        <CardDescription>{formatKickoff(event.startsAt)}</CardDescription>
        <CardTitle className="text-lg">{event.name}</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-3">
        <p className="flex items-center gap-1.5 text-muted-foreground">
          <MapPinIcon className="size-4" aria-hidden />
          {event.venueName}, {event.city}
        </p>

        {isSoldOut ? (
          <p className="font-medium text-destructive">Sold out</p>
        ) : (
          <p className="flex items-center justify-between">
            <span>
              <span className="font-medium">{event.availableSeats.toLocaleString('en-GB')}</span>{' '}
              <span className="text-muted-foreground">seats left</span>
            </span>
            <ChevronRightIcon className="size-5 text-muted-foreground" aria-hidden />
          </p>
        )}
      </CardContent>
    </Card>
  )

  if (isSoldOut) return card

  return (
    <Link
      to={`/events/${event.id}`}
      className="group block h-full rounded-xl outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
    >
      {card}
    </Link>
  )
}
