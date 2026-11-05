import { createBrowserRouter } from 'react-router'

import {
  CheckoutPage,
  EventPage,
  HomePage,
  LoginPage,
  MyTicketsPage,
  NotFoundPage,
  RegisterPage,
  ScanPage,
} from '@/routes/lazy-pages'
import { RootLayout } from '@/app/root-layout'
import { GuestRoute } from '@/routes/guest-route'
import { ProtectedRoute } from '@/routes/protected-route'

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        element: <GuestRoute />,
        children: [
          { path: 'login', element: <LoginPage /> },
          { path: 'register', element: <RegisterPage /> },
        ],
      },
      {
        element: <ProtectedRoute />,
        children: [
          { index: true, element: <HomePage /> },
          { path: 'events/:eventId', element: <EventPage /> },
          { path: 'checkout/:seatId', element: <CheckoutPage /> },
          { path: 'tickets', element: <MyTicketsPage /> },
        ],
      },
      {
        element: <ProtectedRoute role="ROLE_ADMIN" />,
        children: [{ path: 'scan', element: <ScanPage /> }],
      },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])
