import { ChevronRightIcon } from 'lucide-react'

import type { SectionSummary } from '@/features/seats/types'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card'
import { formatPrice } from '@/shared/lib/format'
import { cn } from '@/shared/lib/utils'

type Props = {
  section: SectionSummary
  onSelect: (name: string) => void
}

export const SectionCard = ({ section, onSelect }: Props) => {
  const isSoldOut = section.availableSeats === 0
  const availableShare = (section.availableSeats / section.totalSeats) * 100

  return (
    <button
      type="button"
      disabled={isSoldOut}
      onClick={() => onSelect(section.name)}
      className="group block h-full w-full rounded-xl text-left outline-none focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed"
    >
      <Card
        className={cn(
          'h-full',
          isSoldOut ? 'opacity-60' : 'transition-shadow group-hover:ring-foreground/30',
        )}
      >
        <CardHeader className="grid-cols-[1fr_auto]">
          <CardTitle className="text-lg">{section.name}</CardTitle>
          <span className="text-lg font-semibold">{formatPrice(section.priceCents)}</span>
        </CardHeader>

        <CardContent className="flex flex-col gap-3">
          {isSoldOut ? (
            <p className="font-medium text-destructive">Sold out</p>
          ) : (
            <p className="flex items-center justify-between">
              <span>
                <span className="font-medium">
                  {section.availableSeats.toLocaleString('en-GB')}
                </span>{' '}
                <span className="text-muted-foreground">
                  of {section.totalSeats.toLocaleString('en-GB')} left
                </span>
              </span>
              <ChevronRightIcon className="size-5 text-muted-foreground" aria-hidden />
            </p>
          )}

          <div className="h-1.5 overflow-hidden rounded-full bg-muted" aria-hidden>
            <div
              className="h-full rounded-full bg-primary"
              style={{ width: `${availableShare}%` }}
            />
          </div>
        </CardContent>
      </Card>
    </button>
  )
}
