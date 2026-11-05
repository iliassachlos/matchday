import type { User } from '@/shared/types/user'

export type TokenResponse = {
  accessToken: string
  tokenType: string
  expiresIn: number
}

export type Session = {
  token: string
  user: User
}
