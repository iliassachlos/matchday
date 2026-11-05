import { ArrowLeftIcon, MapPinIcon } from 'lucide-react'
import { Link } from 'react-router'

import { useEvent } from '@/features/events/hooks/use-event'
import { SectionCard } from '@/features/seats/components/section-card'
import { useSections } from '@/features/seats/hooks/use-sections'
import { PageSpinner } from '@/shared/components/page-spinner'
import { Button } from '@/shared/components/ui/button'
import { formatKickoff } from '@/shared/lib/format'

type Props = {
  eventId: string
  onSelectSection: (name: string) => void
}

export const StadiumView = ({ eventId, onSelectSection }: Props) => {
  const { data: event, isPending: isEventPending } = useEvent(eventId)
  const {
    data: sections,
    isPending: isSectionsPending,
    error,
    refetch,
    isRefetching,
  } = useSections(eventId)

  if (isEventPending || isSectionsPending) return <PageSpinner />

  if (!event) {
    return (
      <div className="flex flex-col items-start gap-3">
        <h1 className="text-2xl font-semibold">Match not found</h1>
        <p className="text-muted-foreground">
          This match does not exist or has already been played.
        </p>
        <Button nativeButton={false} render={<Link to="/" />} className="h-11">
          Back to matches
        </Button>
      </div>
    )
  }

  return (
    <section className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <Link
          to="/"
          className="-ml-1 flex w-fit items-center gap-1 py-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeftIcon className="size-4" aria-hidden />
          All matches
        </Link>
        <h1 className="text-2xl font-semibold">{event.name}</h1>
        <p className="flex flex-wrap items-center gap-x-2 text-muted-foreground">
          <span>{formatKickoff(event.startsAt)}</span>
          <span aria-hidden>·</span>
          <span className="flex items-center gap-1">
            <MapPinIcon className="size-4" aria-hidden />
            {event.venueName}, {event.city}
          </span>
        </p>
      </div>

      {!sections ? (
        <div className="flex flex-col items-start gap-3">
          <p className="text-muted-foreground">
            Could not load the seats. {error?.detail ?? error?.title}
          </p>
          <Button className="h-11" onClick={() => refetch()} disabled={isRefetching}>
            Try again
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          <h2 className="text-lg font-medium">Choose a section</h2>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {sections.map((section) => (
              <li key={section.name}>
                <SectionCard section={section} onSelect={onSelectSection} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  )
}
