import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

import { useSupabaseClient } from '@/features/supabase'

async function loginWithPassword({ email, password, supabase }) {
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    throw new Error(error.message)
  }
}

export function useLoginWithPassword({ setFormFeedback }) {
  const navigate = useNavigate()
  const supabase = useSupabaseClient()

  return useMutation({
    mutationFn: ({ email, password }) =>
      loginWithPassword({ email, password, supabase }),
    onSuccess: () => {
      navigate('/profile')
    },
    onError: (err) => {
      console.error(err.message)
      setFormFeedback({ status: 'error', message: err.message })
    },
  })
}
