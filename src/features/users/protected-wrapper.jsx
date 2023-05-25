import { Navigate, useLocation } from 'react-router-dom'

import { useCurrentUser } from './hooks/'

export function ProtectedWrapper({ children }) {
  const { isLoading, isError } = useCurrentUser()
  const location = useLocation()

  if (isLoading) {
    return 'Loading...'
  }
  if (isError) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}
