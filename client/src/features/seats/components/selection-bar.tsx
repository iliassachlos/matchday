import type { Seat } from '@/features/seats/types'
import { formatPrice } from '@/shared/lib/format'

type Props = {
  seat: Seat | null
}

export const SelectionBar = ({ seat }: Props) => {
  return (
    <div
      aria-live="polite"
      className="sticky bottom-[calc(3.5rem+env(safe-area-inset-bottom)+0.75rem)] z-10 flex min-h-16 items-center justify-between gap-4 rounded-xl border bg-background px-4 py-3 shadow-lg md:bottom-4"
    >
      {seat ? (
        <>
          <div className="flex flex-col">
            <span className="font-medium">
              Row {seat.rowLabel}, seat {seat.number}
            </span>
            <span className="text-sm text-muted-foreground">{seat.section}</span>
          </div>
          <span className="text-lg font-semibold">{formatPrice(seat.priceCents)}</span>
        </>
      ) : (
        <span className="text-muted-foreground">Tap a free seat to pick it.</span>
      )}
    </div>
  )
}
