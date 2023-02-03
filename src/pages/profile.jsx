import { Title } from '@/features/ui'
import { useAuth } from '@/features/users'

export function Profile() {
  const auth = useAuth()

  return (
    <div>
      <Title text="Profile" />
      <p>Hi {auth.user && auth.user.email}</p>
    </div>
  )
}
