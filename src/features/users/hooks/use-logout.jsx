import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

import { useSupabaseClient } from '@/features/supabase'

async function logout({ supabase }) {
  const { error } = await supabase.auth.signOut()

  if (error) {
    throw new Error(error.message)
  }
}

export function useLogout() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const supabase = useSupabaseClient()

  return useMutation({
    mutationFn: () => logout({ supabase }),
    onError: (err) => {
      console.error(err.message)
    },
    onSuccess: () => {
      queryClient.removeQueries()
      navigate('/login')
    },
  })
}
