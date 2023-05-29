import { useQuery } from '@tanstack/react-query'

import { useSupabaseClient } from '@/features/supabase'

async function getCurrentUser({ supabase }) {
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    throw new Error('User is not authenticated')
  }

  const user = {
    accessToken: session.access_token,
    email: session.user.email,
    id: session.user.id,
  }

  return user
}

export function useCurrentUser() {
  const supabase = useSupabaseClient()

  return useQuery({
    queryFn: () => getCurrentUser({ supabase }),
    queryKey: ['user'],
    retry: false,
  })
}
