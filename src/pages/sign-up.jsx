import { useState } from 'react'
import { Navigate } from 'react-router-dom'

import { useIsAuthenticated, useSignUp, SignUpForm } from '@/features/users'

const successSignUp =
  'Check your email. Email verification needed to complete your sign up.'

export function SignUp() {
  // State hooks
  const [email, setEmail] = useState('')
  const [formFeedback, setFormFeedback] = useState({ status: '', message: '' })
  const [password, setPassword] = useState('')

  // Fetch hook
  const { data, error, isError, isLoading } = useIsAuthenticated()
  const signUpMutation = useSignUp({ setFormFeedback, successSignUp })

  function handleEmailChange(e) {
    setEmail(e.target.value)
  }
  function handlePasswordChange(e) {
    setPassword(e.target.value)
  }
  async function onSubmit(e) {
    e.preventDefault()
    signUpMutation.mutate({ email, password })
  }

  return isLoading ? (
    'Loading...'
  ) : isError ? (
    <div>Error: {error.message}</div>
  ) : data ? (
    <Navigate to="/profile" />
  ) : (
    <SignUpForm
      email={email}
      formFeedback={formFeedback}
      handleEmailChange={handleEmailChange}
      handlePasswordChange={handlePasswordChange}
      onSubmit={onSubmit}
      password={password}
    />
  )
}
