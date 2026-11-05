import { QueryClient } from '@tanstack/react-query'

import type { ApiError } from '@/shared/api/api-error'

// Every query and mutation error is typed as ApiError, so `error.status` needs no cast
declare module '@tanstack/react-query' {
  interface Register {
    defaultError: ApiError
  }
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 1 },
  },
})
