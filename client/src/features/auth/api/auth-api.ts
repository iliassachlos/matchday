import { apiClient } from '@/shared/api/client'
import type { User } from '@/shared/types/user'
import type { Session, TokenResponse } from '@/features/auth/types'
import type { LoginValues } from '@/features/auth/schemas/login-schema'
import type { RegisterValues } from '@/features/auth/schemas/register-schema'

export const login = async (values: LoginValues): Promise<TokenResponse> => {
  const { data } = await apiClient.post('/auth/login', values)
  return data
}

export const register = async (values: RegisterValues): Promise<User> => {
  const { data } = await apiClient.post('/auth/register', values)
  return data
}

export const fetchMe = async (token: string): Promise<User> => {
  const { data } = await apiClient.get('/auth/me', {
    headers: { Authorization: `Bearer ${token}` },
  })
  return data
}

export const signIn = async (values: LoginValues): Promise<Session> => {
  const { accessToken } = await login(values)
  const user = await fetchMe(accessToken)

  return { token: accessToken, user }
}
