import { Link } from 'react-router'

import { Button } from '@/shared/components/ui/button'

export const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-start gap-4">
      <h1 className="text-2xl font-semibold">Page not found</h1>
      <Button nativeButton={false} render={<Link to="/" />}>
        Back to matches
      </Button>
    </div>
  )
}
