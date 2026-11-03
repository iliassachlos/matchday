import { create } from 'zustand'

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

export const useAuthStore = create<State & Action>()((set) => ({
  ...initialState,

  setSession: (token, user) => {
    set({ token, user })
  },

  logout: () => {
    set(initialState)
  },
}))
