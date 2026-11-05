import {
  CalendarDaysIcon,
  LogInIcon,
  ScanLineIcon,
  TicketIcon,
  UserPlusIcon,
  type LucideIcon,
} from 'lucide-react'

import { useAuthStore } from '@/shared/store/auth-store'

export type NavItem = {
  to: string
  label: string
  icon: LucideIcon
}

const GUEST_ITEMS: NavItem[] = [
  { to: '/login', label: 'Log in', icon: LogInIcon },
  { to: '/register', label: 'Sign up', icon: UserPlusIcon },
]

const FAN_ITEMS: NavItem[] = [
  { to: '/', label: 'Matches', icon: CalendarDaysIcon },
  { to: '/tickets', label: 'My tickets', icon: TicketIcon },
]

const STAFF_ITEM: NavItem = { to: '/scan', label: 'Scan', icon: ScanLineIcon }

export const useNavItems = () => {
  const token = useAuthStore((state) => state.token)
  const isStaff = useAuthStore((state) => state.user?.roles.includes('ROLE_ADMIN') ?? false)

  if (!token) {
    return GUEST_ITEMS
  }

  return isStaff ? [...FAN_ITEMS, STAFF_ITEM] : FAN_ITEMS
}
