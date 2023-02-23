import { useState } from 'react'

import { AccountForm, ProfileForm, supabase, useAuth } from '@/features/users'

const successEmailChange =
  'Check your email - both the old and new email addresses. Two email ' +
  'verifications links need to be clicked to confirm the change you requested.'
const successPasswordChange = 'Your password has been updated'
const successNameChange = 'Your name has been updated'
const initialFeedback = { status: '', message: '' }

export function Profile() {
  const auth = useAuth()
  const [editingAccount, setEditingAccount] = useState(false)
  const [editingProfile, setEditingProfile] = useState(false)
  const [email, setEmail] = useState(auth.user.email)
  const [feedbackAccount, setFeedbackAccount] = useState(initialFeedback)
  const [feedbackProfile, setFeedbackProfile] = useState(initialFeedback)
  const [name, setName] = useState(auth.user.displayName || '')
  const [password, setPassword] = useState('')

  function handleDisplayNameChange(e) {
    setName(e.target.value)
    setEditingProfile(true)
  }
  function handleEmailChange(e) {
    setEmail(e.target.value)
    setEditingAccount(true)
  }
  function handlePasswordChange(e) {
    setPassword(e.target.value)
    setEditingAccount(true)
  }
  async function onSubmitAccount(e) {
    e.preventDefault()
    setFeedbackAccount(initialFeedback)
    const emailChange = email && email !== auth.user.email
    const profile = {
      email,
      password,
    }
    const result = await supabase.auth.updateUser(profile)

    setEditingAccount(false)
    setFeedbackAccount(
      result.error
        ? { status: 'failure', message: result.error.message }
        : {
            status: 'success',
            message: emailChange ? successEmailChange : successPasswordChange,
          }
    )
  }
  async function onSubmitProfile(e) {
    e.preventDefault()
    setFeedbackProfile(initialFeedback)
    const result = await supabase
      .from('profiles')
      .update({ display_name: name })
      .eq('id', auth.user.id)

    setEditingProfile(false)
    setFeedbackProfile(
      result.error
        ? { status: 'failure', message: result.error.message }
        : { status: 'success', message: successNameChange }
    )
  }

  return (
    <>
      <AccountForm
        editing={editingAccount}
        email={email}
        formFeedback={feedbackAccount}
        handleEmailChange={handleEmailChange}
        handlePasswordChange={handlePasswordChange}
        onSubmit={onSubmitAccount}
        password={password}
      />
      <ProfileForm
        editing={editingProfile}
        formFeedback={feedbackProfile}
        handleDisplayNameChange={handleDisplayNameChange}
        name={name}
        onSubmit={onSubmitProfile}
      />
    </>
  )
}
