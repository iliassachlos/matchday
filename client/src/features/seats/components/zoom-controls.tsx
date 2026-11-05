import { MaximizeIcon, MinusIcon, PlusIcon } from 'lucide-react'
import { useControls } from 'react-zoom-pan-pinch'

import { Button } from '@/shared/components/ui/button'

export const ZoomControls = () => {
  const { zoomIn, zoomOut, fitToView } = useControls()

  return (
    <div className="absolute top-3 right-3 z-10 flex flex-col gap-1">
      <Button variant="outline" size="icon-lg" aria-label="Zoom in" onClick={() => zoomIn()}>
        <PlusIcon />
      </Button>
      <Button variant="outline" size="icon-lg" aria-label="Zoom out" onClick={() => zoomOut()}>
        <MinusIcon />
      </Button>
      <Button
        variant="outline"
        size="icon-lg"
        aria-label="Show the whole section"
        onClick={() => fitToView()}
      >
        <MaximizeIcon />
      </Button>
    </div>
  )
}
