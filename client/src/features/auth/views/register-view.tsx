import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router'
import { toast } from 'sonner'

import { useRegister } from '@/features/auth/hooks/use-register'
import {
  registerDefaultValues,
  registerSchema,
  type RegisterValues,
} from '@/features/auth/schemas/register-schema'
import { RhfField } from '@/shared/components/rhf-field'
import { Button } from '@/shared/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card'

export const RegisterView = () => {
  const { mutate: register, isPending } = useRegister()

  const navigate = useNavigate()
  const { control, handleSubmit } = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: registerDefaultValues,
  })

  const onSubmit = (values: RegisterValues) => {
    register(values, {
      onSuccess: async () => {
        await navigate('/', { replace: true })
      },
      onError: (error) => {
        if (error.status === 409) {
          toast.error('An account with this email already exists')
        } else {
          toast.error(error.title, { description: error.detail })
        }
      },
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Create an account</CardTitle>
        <CardDescription>One account, every match.</CardDescription>
      </CardHeader>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <CardContent className="flex flex-col gap-4">
          <RhfField control={control} name="displayName" label="Name" autoComplete="name" />
          <RhfField
            control={control}
            name="email"
            label="Email"
            type="email"
            autoComplete="email"
          />
          <RhfField
            control={control}
            name="password"
            label="Password"
            type="password"
            autoComplete="new-password"
            description="At least 8 characters."
          />

          <Button type="submit" disabled={isPending} className="h-11">
            {isPending ? 'Creating account…' : 'Create account'}
          </Button>
        </CardContent>
      </form>

      <CardFooter className="text-sm text-muted-foreground">
        <p>
          Already have one?{' '}
          <Link to="/login" className="font-medium text-foreground underline underline-offset-4">
            Log in
          </Link>
        </p>
      </CardFooter>
    </Card>
  )
}
