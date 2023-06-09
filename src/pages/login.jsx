import { useState } from 'react'
import { Navigate } from 'react-router-dom'

import {
  useCurrentUser,
  useForgotPassword,
  useLoginWithPassword,
  LoginForm,
} from '@/features/users'

const successForgotPassword = 'Please check your email for reset password link'

export function Login() {
  const [email, setEmail] = useState('')
  const [formFeedback, setFormFeedback] = useState({ status: '', message: '' })
  const [password, setPassword] = useState('')

  // Fetching hooks
  const forgotPasswordMutation = useForgotPassword({
    setFormFeedback,
    successForgotPassword,
  })
  const { data: user, error, isError, isLoading } = useCurrentUser()
  const loginMutation = useLoginWithPassword({ setFormFeedback })

  function handleEmailChange(e) {
    setEmail(e.target.value)
  }
  function handlePasswordChange(e) {
    setPassword(e.target.value)
  }
  async function onSubmit(e) {
    e.preventDefault()
    loginMutation.mutate({ email, password })
  }
  async function handleForgotPassword() {
    forgotPasswordMutation.mutate({ email })
  }

  return isLoading ? (
    <div>Loading</div>
  ) : isError ? (
    <div>Error: {error.message}</div>
  ) : user ? (
    <Navigate to="/profile" />
  ) : (
    <LoginForm
      email={email}
      formFeedback={formFeedback}
      handleEmailChange={handleEmailChange}
      handlePasswordChange={handlePasswordChange}
      onSubmit={onSubmit}
      password={password}
      resetPassword={handleForgotPassword}
    />
  )
}
