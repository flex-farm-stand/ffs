import { Navigate, useLocation } from 'react-router-dom'

import { useAuth } from './auth'

export function RequireAuth({ children }) {
  const auth = useAuth()
  const location = useLocation()

  return auth.user ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  )
}
