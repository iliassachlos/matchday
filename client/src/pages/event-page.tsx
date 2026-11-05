import { useParams, useSearchParams } from 'react-router'

import { SectionView } from '@/features/seats/views/section-view'
import { StadiumView } from '@/features/seats/views/stadium-view'

export const EventPage = () => {
  const { eventId = '' } = useParams()
  const [searchParams, setSearchParams] = useSearchParams()

  const section = searchParams.get('section')

  const handleSelectSection = (name: string) => {
    setSearchParams({ section: name })
  }

  const handleBack = () => {
    setSearchParams({})
  }

  if (section) {
    return <SectionView key={section} eventId={eventId} section={section} onBack={handleBack} />
  }

  return <StadiumView eventId={eventId} onSelectSection={handleSelectSection} />
}
