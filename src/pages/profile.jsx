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
  const [displayName, setDisplayName] = useState(auth.user.displayName || '')

  function handleDisplayNameChange(e) {
    setDisplayName(e.target.value)
  }
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
    const profile = {
      email,
      password,
      data: { displayName },
    }
    const result = await supabase.auth.updateUser(profile)
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
      displayName={displayName}
      email={email}
      formFeedback={formFeedback}
      handleDisplayNameChange={handleDisplayNameChange}
      handleEmailChange={handleEmailChange}
      handlePasswordChange={handlePasswordChange}
      onSubmit={onSubmit}
      password={password}
    />
  )
}
