import { lazy } from 'react'

export const HomePage = lazy(() =>
  import('@/pages/home-page').then((m) => ({ default: m.HomePage })),
)
export const EventPage = lazy(() =>
  import('@/pages/event-page').then((m) => ({ default: m.EventPage })),
)
export const CheckoutPage = lazy(() =>
  import('@/pages/checkout-page').then((m) => ({ default: m.CheckoutPage })),
)
export const MyTicketsPage = lazy(() =>
  import('@/pages/my-tickets-page').then((m) => ({ default: m.MyTicketsPage })),
)
export const ScanPage = lazy(() =>
  import('@/pages/scan-page').then((m) => ({ default: m.ScanPage })),
)
export const LoginPage = lazy(() =>
  import('@/pages/login-page').then((m) => ({ default: m.LoginPage })),
)
export const RegisterPage = lazy(() =>
  import('@/pages/register-page').then((m) => ({ default: m.RegisterPage })),
)
export const NotFoundPage = lazy(() =>
  import('@/pages/not-found-page').then((m) => ({ default: m.NotFoundPage })),
)
