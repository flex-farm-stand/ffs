import { createContext, useContext } from 'react'

export const AuthContext = createContext({
  loginWithEmailLink: () => {},
  loginWithPassword: () => {},
  logout: () => {},
  signUp: () => {},
})

export function useAuth() {
  return useContext(AuthContext)
}
