import { createContext, useContext, useEffect, useState } from 'react'

import { useSupabaseClient } from '@/features/supabase'

const signUpSuccessText =
  'Check your email. Email verification needed to complete your sign up.'

export const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)
  const supabase = useSupabaseClient()

  // Retreive auth info from Supabase API on page load
  useEffect(() => {
    initializeAuthProvider()
  }, [])
  async function initializeAuthProvider() {
    const session = await retrieveSession()
    const currentUser = await retrieveUser(session)
    setUser(currentUser)
    setLoading(false)

    // Set callback for auth events
    supabase.auth.onAuthStateChange(async (e, session) => {
      if (e === 'SIGNED_OUT') {
        setUser(null)
      } else if (e === 'SIGNED_IN' || e === 'USER_UPDATED') {
        const currentUser = await retrieveUser(session)
        setUser(currentUser)
      }
    })
  }
  async function loginWithPassword({ email, password }) {
    const data = await supabase.auth.signInWithPassword({ email, password })
    return !data.error
      ? { status: 'success' }
      : { status: 'failure', message: data.error.message }
  }
  async function logout() {
    const data = await supabase.auth.signOut()
    setUser(null)
    return !data.error
      ? { status: 'success' }
      : { status: 'failure', message: data.error.message }
  }
  async function retrieveSession() {
    const {
      data: { session },
    } = await supabase.auth.getSession()
    return session
  }
  async function retrieveUser(session) {
    // Fail gracefully if session doesn't exist
    if (!session) {
      return null
    }

    // Get the rest of the user's profile
    const currentUser = {
      email: session.user.email,
      id: session.user.id,
    }
    const response = await supabase
      .from('profiles')
      .select()
      .eq('id', currentUser.id)

    if (response.error) {
      throw new Error('Unable to query the profiles table')
    } else if (!response.data || response.data.length !== 1) {
      throw new Error('Match not found in profiles table')
    }
    currentUser.displayName = response.data[0].display_name

    return currentUser
  }
  async function signUp({ email, password }) {
    const data = await supabase.auth.signUp({
      email,
      password,
    })
    return !data.error
      ? { status: 'success', message: signUpSuccessText }
      : { status: 'failure', message: data.error.message }
  }
  return (
    <AuthContext.Provider
      value={{
        loginWithPassword,
        logout,
        signUp,
        user,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
