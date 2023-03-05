import { useState } from 'react'
import { Navigate } from 'react-router-dom'

import { SignUpForm, useAuth } from '@/features/users'

export function SignUp() {
  const auth = useAuth()
  const [email, setEmail] = useState('')
  const [formFeedback, setFormFeedback] = useState({ status: '', message: '' })
  const [password, setPassword] = useState('')

  function handleEmailChange(e) {
    setEmail(e.target.value)
  }
  function handlePasswordChange(e) {
    setPassword(e.target.value)
  }
  async function onSubmit(e) {
    e.preventDefault()
    const result = await auth.signUp({ email, password })
    setFormFeedback(result)
  }

  return auth.user ? (
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
