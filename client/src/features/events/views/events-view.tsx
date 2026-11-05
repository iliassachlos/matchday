import { EventCard } from '@/features/events/components/event-card'
import { useEvents } from '@/features/events/hooks/use-events'
import { PageSpinner } from '@/shared/components/page-spinner'
import { Button } from '@/shared/components/ui/button'

export const EventsView = () => {
  const { data: events, isPending, error, refetch, isRefetching } = useEvents()

  if (isPending) return <PageSpinner />

  if (!events) {
    return (
      <div className="flex flex-col items-start gap-3">
        <h1 className="text-2xl font-semibold">Could not load matches</h1>
        <p className="text-muted-foreground">{error?.detail ?? error?.title}</p>
        <Button className="h-11" onClick={() => refetch()} disabled={isRefetching}>
          Try again
        </Button>
      </div>
    )
  }

  return (
    <section className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold">Upcoming matches</h1>
        <p className="text-muted-foreground">Pick a match to choose your seat.</p>
      </div>

      {events.length === 0 ? (
        <p className="text-muted-foreground">No upcoming matches right now.</p>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <li key={event.id}>
              <EventCard event={event} />
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
