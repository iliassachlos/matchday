import { QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider } from 'react-router'

import { router } from '@/routes/router'
import { queryClient } from '@/shared/api/query-client'

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}
