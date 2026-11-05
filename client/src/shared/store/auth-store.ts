import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import type { User } from '@/shared/types/user'

type State = {
  token: string | null
  user: User | null
}

type Action = {
  setSession: (token: string, user: User) => void
  logout: () => void
}

const initialState: State = {
  token: null,
  user: null,
}

// Persist the auth state in local storage so that the user remains logged in across page reloads.
export const useAuthStore = create<State & Action>()(
  persist(
    (set) => ({
      ...initialState,

      setSession: (token, user) => {
        set({ token, user })
      },

      logout: () => {
        set(initialState)
      },
    }),
    { name: 'matchday-auth' },
  ),
)
