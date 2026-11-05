import { Link, NavLink } from 'react-router'

import { Logo } from '@/shared/components/logo'
import { Button } from '@/shared/components/ui/button'
import { useNavItems } from '@/shared/hooks/use-nav-items'
import { cn } from '@/shared/lib/utils'
import { useAuthStore } from '@/shared/store/auth-store'

export const AppHeader = () => {
  const user = useAuthStore((state) => state.user)
  const logout = useAuthStore((state) => state.logout)

  const navItems = useNavItems()

  return (
    <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2.5" aria-label="Matchday, home">
          <Logo size={32} />
          <span className="text-lg font-semibold tracking-tight">matchday</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                cn(
                  'rounded-md px-3 py-2 text-sm text-muted-foreground hover:text-foreground',
                  isActive && 'bg-muted text-foreground',
                )
              }
            >
              {item.label}
            </NavLink>
          ))}

          {user && (
            <>
              <span className="ml-3 text-sm text-muted-foreground">{user.displayName}</span>
              <Button variant="ghost" size="sm" onClick={logout}>
                Log out
              </Button>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}
