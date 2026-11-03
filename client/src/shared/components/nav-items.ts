import { CalendarDaysIcon, LogInIcon, TicketIcon, type LucideIcon } from 'lucide-react'

export type NavItem = {
  to: string
  label: string
  icon: LucideIcon
}

export const navItems: NavItem[] = [
  { to: '/', label: 'Matches', icon: CalendarDaysIcon },
  { to: '/tickets', label: 'My tickets', icon: TicketIcon },
  { to: '/login', label: 'Log in', icon: LogInIcon },
]
