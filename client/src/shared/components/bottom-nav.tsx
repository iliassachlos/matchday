import { LogOutIcon } from 'lucide-react'
import { NavLink } from 'react-router'

import { useNavItems } from '@/shared/hooks/use-nav-items'
import { cn } from '@/shared/lib/utils'
import { useAuthStore } from '@/shared/store/auth-store'

const TAB =
  'flex h-14 w-full flex-col items-center justify-center gap-0.5 text-xs text-muted-foreground'

export const BottomNav = () => {
  const token = useAuthStore((state) => state.token)
  const logout = useAuthStore((state) => state.logout)

  const navItems = useNavItems()

  return (
    <nav className="fixed inset-x-0 bottom-0 z-10 border-t bg-background pb-[env(safe-area-inset-bottom)] md:hidden">
      <ul className="flex">
        {navItems.map((item) => (
          <li key={item.to} className="flex-1">
            <NavLink
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) => cn(TAB, isActive && 'text-foreground')}
            >
              <item.icon className="size-5" aria-hidden />
              {item.label}
            </NavLink>
          </li>
        ))}

        {token && (
          <li className="flex-1">
            <button type="button" onClick={logout} className={TAB}>
              <LogOutIcon className="size-5" aria-hidden />
              Log out
            </button>
          </li>
        )}
      </ul>
    </nav>
  )
}
