import { createContext, useContext, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const SupabaseClientContext = createContext(null)

export function SupabaseProvider({ children }) {
  const [client] = useState(() =>
    createClient(
      import.meta.env.VITE_SUPABASE_URL || 'http://localhost:8000',
      import.meta.env.VITE_SUPABASE_ANON_KEY || 'noop'
    )
  )

  return (
    <SupabaseClientContext.Provider value={client}>
      {children}
    </SupabaseClientContext.Provider>
  )
}

export function useSupabaseClient() {
  const client = useContext(SupabaseClientContext)
  if (client === null) {
    throw new Error(
      'Supabase client not provided via context.\n' +
        'Did you forget to wrap your component tree with SupabaseProvider?'
    )
  }
  return client
}
