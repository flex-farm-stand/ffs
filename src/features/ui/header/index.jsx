import { useLocation } from 'react-router-dom'

import { Button } from '@/features/ui'
import { useAuth } from '@/features/users'

const pagesWithoutHeader = ['/login', '/signup']

export function Header() {
  const auth = useAuth()
  const location = useLocation()

  // Hide header on specific pages
  if (pagesWithoutHeader.includes(location.pathname)) {
    return null
  }

  return (
    <header>
      {auth.user && <Button onClick={auth.logout} text="Logout" />}
    </header>
  )
}
