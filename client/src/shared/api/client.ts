import axios from 'axios'

import { ApiError } from '@/shared/api/api-error'
import { useAuthStore } from '@/shared/store/auth-store'

export const apiClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL ?? ''}/api/v1`,
})

apiClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token

  if (token && !config.headers.Authorization) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

apiClient.interceptors.response.use(undefined, (error) => {
  if (!axios.isAxiosError(error) || !error.response) {
    return Promise.reject(
      new ApiError(0, 'Cannot reach the server', 'Check your connection and try again.'),
    )
  }

  const { status, data } = error.response

  if (status === 401) {
    useAuthStore.getState().logout()
  }

  return Promise.reject(new ApiError(status, data?.title ?? 'Something went wrong', data?.detail))
})
