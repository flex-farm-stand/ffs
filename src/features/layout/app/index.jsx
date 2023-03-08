import { Outlet } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'

import { Nav } from '@/features/layout'
import { SupabaseProvider } from '@/features/supabase'
import { DarkModeContext, useDarkMode } from '@/features/ui'
import { AuthProvider } from '@/features/users'
import { GlobalStyle } from './global-style'
import { themes } from './themes'

export function App() {
  const [theme, effectiveTheme, setTheme] = useDarkMode()

  return (
    <SupabaseProvider>
      <AuthProvider>
        <DarkModeContext.Provider value={{ theme, effectiveTheme, setTheme }}>
          <ThemeProvider theme={themes[effectiveTheme]}>
            <div className="app">
              <GlobalStyle />
              <Nav />
              <Outlet />
            </div>
          </ThemeProvider>
        </DarkModeContext.Provider>
      </AuthProvider>
    </SupabaseProvider>
  )
}
