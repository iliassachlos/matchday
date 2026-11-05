import { useMutation } from '@tanstack/react-query'

import { register, signIn } from '@/features/auth/api/auth-api'
import type { RegisterValues } from '@/features/auth/schemas/register-schema'
import { useAuthStore } from '@/shared/store/auth-store'

export const useRegister = () => {
  const setSession = useAuthStore((state) => state.setSession)

  return useMutation({
    mutationFn: async (values: RegisterValues) => {
      await register(values)
      return signIn(values)
    },
    onSuccess: ({ token, user }) => setSession(token, user),
  })
}
