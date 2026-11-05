export type SeatStatus = 'AVAILABLE' | 'RESERVED' | 'SOLD'

export type Seat = {
  id: string
  section: string
  rowLabel: string
  number: number
  priceCents: number
  status: SeatStatus
}

export type SeatRow = {
  label: string
  seats: Seat[]
}

export type SectionSummary = {
  name: string
  priceCents: number
  totalSeats: number
  availableSeats: number
}

export type SeatState = 'available' | 'selected' | 'mine' | 'held' | 'sold'
