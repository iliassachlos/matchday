export type Role = 'ROLE_USER' | 'ROLE_ADMIN'

export type User = {
  id: string
  email: string
  displayName: string
  roles: Role[]
  createdAt: string
}
