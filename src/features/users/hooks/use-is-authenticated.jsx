import { useQuery } from '@tanstack/react-query'

import { useSupabaseClient } from '@/features/supabase'

async function isAuthenticated({ supabase }) {
  const {
    data: { session },
  } = await supabase.auth.getSession()

  return !!session
}

export function useIsAuthenticated() {
  const supabase = useSupabaseClient()

  return useQuery({
    queryFn: () => isAuthenticated({ supabase }),
    queryKey: ['isAuthenticated'],
    retry: false,
  })
}
