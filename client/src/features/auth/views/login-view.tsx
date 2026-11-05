import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link, useLocation, useNavigate } from 'react-router'
import { toast } from 'sonner'

import { useLogin } from '@/features/auth/hooks/use-login'
import {
  loginDefaultValues,
  loginSchema,
  type LoginValues,
} from '@/features/auth/schemas/login-schema'
import { RhfField } from '@/shared/components/rhf-field'
import { Button } from '@/shared/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card'

export const LoginView = () => {
  const { mutate: login, isPending } = useLogin()

  const navigate = useNavigate()
  const location = useLocation()
  const { control, handleSubmit } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: loginDefaultValues,
  })

  const redirectTo = (location.state as { from?: string } | null)?.from ?? '/'

  const onSubmit = (values: LoginValues) => {
    login(values, {
      onSuccess: async () => {
        await navigate(redirectTo, { replace: true })
      },
      onError: (error) => {
        if (error.status === 401) {
          toast.error('Wrong email or password')
        } else {
          toast.error(error.title, { description: error.detail })
        }
      },
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Log in</CardTitle>
      </CardHeader>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <CardContent className="flex flex-col gap-4">
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
            autoComplete="current-password"
          />

          <Button type="submit" disabled={isPending} className="h-11">
            {isPending ? 'Logging in…' : 'Log in'}
          </Button>
        </CardContent>
      </form>

      <CardFooter className="flex flex-col items-start gap-3 text-sm">
        <p className="text-muted-foreground">
          No account?{' '}
          <Link to="/register" className="font-medium text-foreground underline underline-offset-4">
            Create one
          </Link>
        </p>
      </CardFooter>
    </Card>
  )
}
