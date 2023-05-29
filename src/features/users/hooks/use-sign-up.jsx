import { useMutation } from '@tanstack/react-query'

import { useSupabaseClient } from '@/features/supabase'

async function signUp({ email, password, supabase }) {
  const { error } = await supabase.auth.signUp({
    email,
    password,
  })

  if (error) {
    throw new Error(error.message)
  }
}

export function useSignUp({ setFormFeedback, successSignUp }) {
  const supabase = useSupabaseClient()

  return useMutation({
    mutationFn: ({ email, password }) => signUp({ email, password, supabase }),
    onSuccess: () => {
      setFormFeedback({ status: 'success', message: successSignUp })
    },
    onError: (err) => {
      console.error(err.message)
      setFormFeedback({ status: 'error', message: err.message })
    },
  })
}
