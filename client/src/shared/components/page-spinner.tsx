import { Loader2Icon } from 'lucide-react'

export const PageSpinner = () => {
  return (
    <div className="flex justify-center py-16" role="status" aria-label="Loading">
      <Loader2Icon className="size-6 animate-spin text-muted-foreground" />
    </div>
  )
}
