import { useMutation } from '@tanstack/react-query'

import { signIn } from '@/features/auth/api/auth-api'
import { useAuthStore } from '@/shared/store/auth-store'

export const useLogin = () => {
  const setSession = useAuthStore((state) => state.setSession)

  return useMutation({
    mutationFn: signIn,
    onSuccess: ({ token, user }) => setSession(token, user),
  })
}
