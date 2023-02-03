import { Navigate, useLocation } from 'react-router-dom'

import { useAuth } from './auth-context'

export function RequireAuth({ children }) {
  const auth = useAuth()
  const location = useLocation()

  return auth.user ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  )
}
