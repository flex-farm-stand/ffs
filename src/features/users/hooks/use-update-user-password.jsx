import { useMutation } from '@tanstack/react-query'

import { useSupabaseClient } from '@/features/supabase'

async function updateUserPassword({ email, password, supabase }) {
  const { error } = await supabase.auth.updateUser({
    email,
    password,
  })

  if (error) {
    throw new Error(error.message)
  }
}

export function useUpdateUserPassword({
  setFormFeedback,
  successPasswordChange,
}) {
  const supabase = useSupabaseClient()

  return useMutation({
    mutationFn: ({ email, password }) =>
      updateUserPassword({ email, password, supabase }),
    onSuccess: () => {
      setFormFeedback({ status: 'success', message: successPasswordChange })
    },
    onError: (err) => {
      console.error(err.message)
      setFormFeedback({ status: 'error', message: err.message })
    },
  })
}
