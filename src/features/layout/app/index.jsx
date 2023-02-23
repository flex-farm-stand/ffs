import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'

import { Nav } from '@/features/layout'
import { DarkModeContext, useDarkMode } from '@/features/ui'
import { AuthContext, supabase } from '@/features/users'
import { GlobalStyle } from './global-style'
import { themes } from './themes'

const signUpSuccessText =
  'Check your email. Email verification needed to complete your sign up.'

export function App() {
  const [user, setUser] = useState(null)
  const [theme, effectiveTheme, setTheme] = useDarkMode()

  // Retreive auth info from Supabase API on page load
  useEffect(() => {
    initializeAuthProvider()
  }, [])
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
  async function initializeAuthProvider() {
    const session = await retrieveSession()
    const currentUser = await retrieveUser(session)
    setUser(currentUser)

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
      <DarkModeContext.Provider value={{ theme, effectiveTheme, setTheme }}>
        <ThemeProvider theme={themes[effectiveTheme]}>
          <div className="app">
            <GlobalStyle />
            <Nav />
            <Outlet />
          </div>
        </ThemeProvider>
      </DarkModeContext.Provider>
    </AuthContext.Provider>
  )
}
