import { useParams, useSearchParams } from 'react-router'

import { StadiumView } from '@/features/seats/views/stadium-view'

export const EventPage = () => {
  const { eventId = '' } = useParams()
  const [searchParams, setSearchParams] = useSearchParams()

  const section = searchParams.get('section')

  const handleSelectSection = (name: string) => {
    setSearchParams({ section: name })
  }

  if (section) {
    return <h1 className="text-2xl font-semibold">{section}: seat grid comes in step 3</h1>
  }

  return <StadiumView eventId={eventId} onSelectSection={handleSelectSection} />
}
