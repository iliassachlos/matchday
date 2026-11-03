import { createBrowserRouter } from 'react-router'

import { RootLayout } from '@/app/root-layout'
import {
  CheckoutPage,
  EventPage,
  LoginPage,
  HomePage,
  MyTicketsPage,
  NotFoundPage,
  RegisterPage,
  ScanPage,
} from '@/app/lazy-pages'

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'events/:eventId', element: <EventPage /> },
      { path: 'checkout/:seatId', element: <CheckoutPage /> },
      { path: 'tickets', element: <MyTicketsPage /> },
      { path: 'scan', element: <ScanPage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'register', element: <RegisterPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])
