// Named EventSummary, not Event: that name is already the DOM's global Event type
export type EventSummary = {
  id: string
  name: string
  startsAt: string
  venueName: string
  city: string
  availableSeats: number
}
