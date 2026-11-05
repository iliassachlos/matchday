import { Navigate, Outlet } from 'react-router'

import { useAuthStore } from '@/shared/store/auth-store'

export const GuestRoute = () => {
  const token = useAuthStore((state) => state.token)

  if (token) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}
