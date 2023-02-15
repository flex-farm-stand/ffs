import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'

import { Header } from '@/features/ui'
import { AuthContext, supabase } from '@/features/users'

const signUpSuccessText =
  'Check your email. Email verification needed to complete your sign up.'

export function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    initializeAuthProvider()
  }, [])
  async function initializeAuthProvider() {
    // Retreive auth info from Supabase API on page load
    const {
      data: { session },
    } = await supabase.auth.getSession()
    setUser(
      session && {
        email: session.user.email,
        id: session.user.id,
      }
    )

    // Set callback for auth events
    supabase.auth.onAuthStateChange((e, session) => {
      if (e === 'SIGNED_OUT') {
        setUser(null)
      } else if (e === 'SIGNED_IN') {
        setUser({
          email: session.user.email,
          id: session.user.id,
        })
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
    <AuthContext.Provider value={{ loginWithPassword, logout, signUp, user }}>
      <div className="app">
        <Header />
        <Outlet />
      </div>
    </AuthContext.Provider>
  )
}
