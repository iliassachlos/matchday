import { SEAT_STYLES } from '@/features/seats/lib/seat-styles'
import type { SeatState } from '@/features/seats/types'
import { cn } from '@/shared/lib/utils'

const ITEMS: { state: SeatState; label: string }[] = [
  { state: 'available', label: 'Available' },
  { state: 'selected', label: 'Your pick' },
  { state: 'mine', label: 'Yours' },
  { state: 'held', label: 'Held' },
  { state: 'sold', label: 'Sold' },
]

export const SeatLegend = () => {
  return (
    <ul className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground">
      {ITEMS.map((item) => (
        <li key={item.state} className="flex items-center gap-2">
          <span className={cn('size-4 rounded', SEAT_STYLES[item.state])} aria-hidden />
          {item.label}
        </li>
      ))}
    </ul>
  )
}
