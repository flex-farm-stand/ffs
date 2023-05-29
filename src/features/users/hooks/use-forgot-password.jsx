import { useMutation } from '@tanstack/react-query'

import { useSupabaseClient } from '@/features/supabase'

async function forgotPassword({ email, supabase }) {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
  if (!supabaseUrl) {
    throw new Error('Supabase URL not specified')
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${supabaseUrl}/profile`,
  })

  if (error) {
    throw new Error(error.message)
  }
}

export function useForgotPassword({ setFormFeedback, successForgotPassword }) {
  const supabase = useSupabaseClient()

  return useMutation({
    mutationFn: ({ email }) => forgotPassword({ email, supabase }),
    onSuccess: () => {
      setFormFeedback({ status: 'success', message: successForgotPassword })
    },
    onError: (err) => {
      console.error(err.message)
      setFormFeedback({ status: 'error', message: err.message })
    },
  })
}
