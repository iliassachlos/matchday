import { Navigate, Outlet, useLocation } from 'react-router'

import { useAuthStore } from '@/shared/store/auth-store'
import type { Role } from '@/shared/types/user'

type ProtectedRouteProps = {
  role?: Role
}

export const ProtectedRoute = ({ role }: ProtectedRouteProps) => {
  const token = useAuthStore((state) => state.token)
  const roles = useAuthStore((state) => state.user?.roles)

  const location = useLocation()

  if (!token) {
    return <Navigate to="/login" replace state={{ from: location.pathname + location.search }} />
  }

  if (role && !roles?.includes(role)) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}
