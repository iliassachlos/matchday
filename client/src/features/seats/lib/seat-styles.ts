import type { SeatState } from '@/features/seats/types'

export const SEAT_STYLES: Record<SeatState, string> = {
  available: 'bg-background text-foreground ring-1 ring-emerald-600/60 hover:bg-emerald-50',
  selected: 'bg-primary text-primary-foreground ring-2 ring-primary',
  mine: 'bg-sky-500 text-white',
  held: 'bg-amber-200 text-amber-900',
  sold: 'bg-muted text-muted-foreground/50',
}
