import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import styled, { ThemeProvider } from 'styled-components'

import { Nav } from '@/features/layout'
import { DarkModeContext, useDarkMode } from '@/features/ui'
import { AuthContext, supabase } from '@/features/users'
import { GlobalStyle } from './global-style'
import { themes } from './themes'

const signUpSuccessText =
  'Check your email. Email verification needed to complete your sign up.'

const Button = styled.button`
  background-color: ${({ theme }) => theme.button.bg};
  color: ${({ theme }) => theme.button.text};
`

export function App() {
  const [user, setUser] = useState(null)
  const [theme, effectiveTheme, setTheme] = useDarkMode()

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
      <DarkModeContext.Provider value={{ theme, effectiveTheme, setTheme }}>
        <ThemeProvider theme={themes[effectiveTheme]}>
          <div className="app">
            <GlobalStyle />
            <Nav />
            <div>
              <p>Current theme: {theme}</p>
              <p>Current effective mode: {effectiveTheme}</p>
              <Button onClick={() => setTheme('light')}>Light</Button>
              <Button onClick={() => setTheme('auto')}>Auto</Button>
              <Button onClick={() => setTheme('dark')}>Dark</Button>
            </div>
            <Outlet />
          </div>
        </ThemeProvider>
      </DarkModeContext.Provider>
    </AuthContext.Provider>
  )
}
