import { SEAT_STYLES } from '@/features/seats/lib/seat-styles'
import type { Seat, SeatState } from '@/features/seats/types'
import { cn } from '@/shared/lib/utils'

const SEAT_LABELS: Record<SeatState, string> = {
  available: 'available',
  selected: 'selected',
  mine: 'yours',
  held: 'held by another fan',
  sold: 'sold',
}

type Props = {
  seat: Seat
  state: SeatState
  onSelect: (seatId: string) => void
}

export const SeatButton = ({ seat, state, onSelect }: Props) => {
  const isSelectable = state === 'available' || state === 'selected'

  return (
    <button
      type="button"
      disabled={!isSelectable}
      aria-pressed={state === 'selected'}
      aria-label={`Row ${seat.rowLabel}, seat ${seat.number}, ${SEAT_LABELS[state]}`}
      onClick={() => onSelect(seat.id)}
      className={cn(
        'flex size-8 shrink-0 items-center justify-center rounded-md text-[0.65rem] font-medium tabular-nums disabled:cursor-not-allowed',
        SEAT_STYLES[state],
      )}
    >
      {seat.number}
    </button>
  )
}
