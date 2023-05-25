import { useMutation } from '@tanstack/react-query'

import { useSupabaseClient } from '@/features/supabase'

async function updateUserEmail({ email, password, supabase }) {
  const { error } = await supabase.auth.updateUser({
    email,
    password,
  })

  if (error) {
    throw new Error(error.message)
  }
}

export function useUpdateUserEmail({ setFormFeedback, successEmailChange }) {
  const supabase = useSupabaseClient()

  return useMutation({
    mutationFn: ({ email, password }) =>
      updateUserEmail({ email, password, supabase }),
    onSuccess: () => {
      setFormFeedback({ status: 'success', message: successEmailChange })
    },
    onError: (err) => {
      console.error(err.message)
      setFormFeedback({ status: 'error', message: err.message })
    },
  })
}
