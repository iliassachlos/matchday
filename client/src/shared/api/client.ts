import axios from 'axios'

import { useAuthStore } from '@/shared/store/auth-store'

export const apiClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL ?? ''}/api/v1`,
})

apiClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

// Intercept 401 response and log out the user if the token is invalid or expired
apiClient.interceptors.response.use(undefined, (error) => {
  if (axios.isAxiosError(error) && error.response?.status === 401) {
    useAuthStore.getState().logout()
  }

  return Promise.reject(error)
})
