import { Suspense } from 'react'
import { Outlet } from 'react-router'

import { AppHeader } from '@/shared/components/app-header'
import { BottomNav } from '@/shared/components/bottom-nav'
import { PageSpinner } from '@/shared/components/page-spinner'
import { Toaster } from '@/shared/components/ui/sonner'

export const RootLayout = () => {
  return (
    <div className="min-h-svh bg-background text-foreground">
      <AppHeader />

      <main className="mx-auto w-full max-w-5xl px-4 pt-6 pb-24 md:pb-10">
        <Suspense fallback={<PageSpinner />}>
          <Outlet />
        </Suspense>
      </main>

      <BottomNav />
      <Toaster position="top-center" richColors />
    </div>
  )
}
