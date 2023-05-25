import { Outlet } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import { Nav } from '@/features/layout'
import { SupabaseProvider } from '@/features/supabase'
import { DarkModeContext, useDarkMode } from '@/features/ui'
import { GlobalStyle } from './global-style'
import { themes } from './themes'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

export function App() {
  const [theme, effectiveTheme, setTheme] = useDarkMode()

  return (
    <SupabaseProvider>
      <QueryClientProvider client={queryClient}>
        <DarkModeContext.Provider value={{ theme, effectiveTheme, setTheme }}>
          <ThemeProvider theme={themes[effectiveTheme]}>
            <div className="app">
              <GlobalStyle />
              <Nav />
              <Outlet />
            </div>
          </ThemeProvider>
        </DarkModeContext.Provider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </SupabaseProvider>
  )
}
