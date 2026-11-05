import { ArrowLeftIcon } from 'lucide-react'
import { useState } from 'react'

import { useEvent } from '@/features/events/hooks/use-event'
import { SeatGrid } from '@/features/seats/components/seat-grid'
import { SeatLegend } from '@/features/seats/components/seat-legend'
import { SelectionBar } from '@/features/seats/components/selection-bar'
import { useMySeatIds } from '@/features/seats/hooks/use-my-seat-ids'
import { useSectionRows } from '@/features/seats/hooks/use-section-rows'
import { PageSpinner } from '@/shared/components/page-spinner'
import { Button } from '@/shared/components/ui/button'
import { formatPrice } from '@/shared/lib/format'

type Props = {
  eventId: string
  section: string
  onBack: () => void
}

export const SectionView = ({ eventId, section, onBack }: Props) => {
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const { data: event } = useEvent(eventId)
  const { data: rows, isPending, error, refetch, isRefetching } = useSectionRows(eventId, section)
  const { data: mySeatIds = new Set<string>() } = useMySeatIds()

  const selectedSeat =
    rows
      ?.flatMap((row) => row.seats)
      .find((seat) => seat.id === selectedId && seat.status === 'AVAILABLE') ?? null
  const priceCents = rows?.[0]?.seats[0]?.priceCents

  const backLink = (
    <button
      type="button"
      onClick={onBack}
      className="-ml-1 flex w-fit items-center gap-1 py-2 text-sm text-muted-foreground hover:text-foreground"
    >
      <ArrowLeftIcon className="size-4" aria-hidden />
      All sections
    </button>
  )

  const handleSelect = (seatId: string) => {
    setSelectedId((current) => (current === seatId ? null : seatId))
  }

  if (isPending) return <PageSpinner />

  if (!rows) {
    return (
      <div className="flex flex-col items-start gap-3">
        {backLink}
        <p className="text-muted-foreground">
          Could not load the seats. {error?.detail ?? error?.title}
        </p>
        <Button className="h-11" onClick={() => refetch()} disabled={isRefetching}>
          Try again
        </Button>
      </div>
    )
  }

  if (rows.length === 0) {
    return (
      <div className="flex flex-col items-start gap-3">
        {backLink}
        <h1 className="text-2xl font-semibold">Section not found</h1>
        <p className="text-muted-foreground">This match has no section called {section}.</p>
      </div>
    )
  }

  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        {backLink}
        <h1 className="text-2xl font-semibold">{section}</h1>
        <p className="text-muted-foreground">
          {event?.name}
          {priceCents !== undefined && ` · ${formatPrice(priceCents)} per seat`}
        </p>
      </div>

      <SeatLegend />

      <SeatGrid
        rows={rows}
        mySeatIds={mySeatIds}
        selectedId={selectedSeat?.id ?? null}
        onSelect={handleSelect}
      />

      <SelectionBar seat={selectedSeat} />
    </section>
  )
}
