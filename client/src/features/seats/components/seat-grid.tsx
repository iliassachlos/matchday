import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch'

import { SeatButton } from '@/features/seats/components/seat-button'
import { ZoomControls } from '@/features/seats/components/zoom-controls'
import type { Seat, SeatRow, SeatState } from '@/features/seats/types'

type Props = {
  rows: SeatRow[]
  mySeatIds: Set<string>
  selectedId: string | null
  onSelect: (seatId: string) => void
}

export const SeatGrid = ({ rows, mySeatIds, selectedId, onSelect }: Props) => {
  const stateOf = (seat: Seat): SeatState => {
    if (mySeatIds.has(seat.id) && seat.status !== 'AVAILABLE') return 'mine'
    if (seat.status === 'SOLD') return 'sold'
    if (seat.status === 'RESERVED') return 'held'
    
    return seat.id === selectedId ? 'selected' : 'available'
  }

  return (
    <div className="relative h-[60svh] overflow-hidden rounded-xl border bg-muted/30">
      <TransformWrapper fitOnInit minScale={0.1} maxScale={3} doubleClick={{ disabled: true }}>
        <ZoomControls />

        <TransformComponent wrapperClass="size-full!" contentClass="p-6">
          <div className="flex flex-col gap-1.5">
            <div className="mb-4 ml-8 rounded-md bg-emerald-700/80 py-2 text-center text-xs font-medium tracking-widest text-white uppercase">
              Pitch
            </div>

            {rows.map((row) => (
              <div key={row.label} className="flex items-center gap-1">
                <span className="w-7 shrink-0 text-right text-xs text-muted-foreground tabular-nums">
                  {row.label}
                </span>
                {row.seats.map((seat) => (
                  <SeatButton key={seat.id} seat={seat} state={stateOf(seat)} onSelect={onSelect} />
                ))}
              </div>
            ))}
          </div>
        </TransformComponent>
      </TransformWrapper>
    </div>
  )
}
