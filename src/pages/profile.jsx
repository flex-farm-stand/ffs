import { useState } from 'react'

import { ProfileForm, supabase, useAuth } from '@/features/users'

const passwordChangeSuccessText = 'Your password has been updated'
const emailChangeSuccessText =
  'Check your email - both the old and new email addresses. Two email ' +
  'verifications links need to be clicked to confirm the change you requested.'
const initialValueFormFeedback = { status: '', message: '' }

export function Profile() {
  const auth = useAuth()
  const [email, setEmail] = useState(auth.user.email)
  const [formFeedback, setFormFeedback] = useState(initialValueFormFeedback)
  const [password, setPassword] = useState('')

  function handleEmailChange(e) {
    setEmail(e.target.value)
  }
  function handlePasswordChange(e) {
    setPassword(e.target.value)
  }
  async function onSubmit(e) {
    e.preventDefault()
    setFormFeedback(initialValueFormFeedback)
    const emailChange = email && email !== auth.user.email
    const result = await supabase.auth.updateUser({
      email,
      password,
    })
    setFormFeedback(
      result.error
        ? { status: 'failure', message: result.error.message }
        : {
            status: 'success',
            message: emailChange
              ? emailChangeSuccessText
              : passwordChangeSuccessText,
          }
    )
  }

  return (
    <ProfileForm
      email={email}
      formFeedback={formFeedback}
      handleEmailChange={handleEmailChange}
      handlePasswordChange={handlePasswordChange}
      onSubmit={onSubmit}
      password={password}
    />
  )
}
