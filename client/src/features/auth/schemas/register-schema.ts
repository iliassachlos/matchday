import { z } from 'zod'

export const registerSchema = z.object({
  displayName: z.string().trim().min(1, 'Enter your name').max(255),
  email: z.email('Enter a valid email').max(255),
  password: z.string().min(8, 'At least 8 characters').max(255),
})

export type RegisterValues = z.infer<typeof registerSchema>

export const registerDefaultValues: RegisterValues = {
  displayName: '',
  email: '',
  password: '',
}
