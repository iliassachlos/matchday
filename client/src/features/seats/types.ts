export type SeatStatus = 'AVAILABLE' | 'RESERVED' | 'SOLD'

export type Seat = {
  id: string
  section: string
  rowLabel: string
  number: number
  priceCents: number
  status: SeatStatus
}

export type SectionSummary = {
  name: string
  priceCents: number
  totalSeats: number
  availableSeats: number
}
