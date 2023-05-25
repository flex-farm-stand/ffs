import { useEffect, useState } from 'react'

import { CenterAndLimitWidth } from '@/features/ui'
import { AccountForm, ProfileForm } from '@/features/users'

import {
  useCurrentUserProfile,
  useUpdateUserEmail,
  useUpdateUserPassword,
  useUpdateUserProfile,
} from '@/features/users'

// Form feedback messages
const successEmailChange =
  'Check your email - both the old and new email addresses. Two email ' +
  'verifications links need to be clicked to confirm the change you requested.'
const successPasswordChange = 'Your password has been updated'
const successNameChange = 'Your name has been updated'
const initialFeedback = { status: '', message: '' }

export function Profile() {
  // State hooks
  const [editingAccount, setEditingAccount] = useState(false)
  const [editingProfile, setEditingProfile] = useState(false)
  const [email, setEmail] = useState('')
  const [feedbackAccount, setFeedbackAccount] = useState(initialFeedback)
  const [feedbackProfile, setFeedbackProfile] = useState(initialFeedback)
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')

  // Fetching hooks
  const { data: user, error, isError, isLoading } = useCurrentUserProfile()
  const updateUserEmailMutation = useUpdateUserEmail({
    setFormFeedback: setFeedbackAccount,
    successEmailChange,
  })
  const updateUserPasswordMutation = useUpdateUserPassword({
    setFormFeedback: setFeedbackAccount,
    successPasswordChange,
  })
  const updateUserProfileMutation = useUpdateUserProfile({
    setFormFeedback: setFeedbackProfile,
    successNameChange,
  })

  // Misc hooks
  // Needed to assign initial value, as mentioned here:
  // https://stackoverflow.com/a/70500870
  useEffect(() => {
    setEmail(user?.email || '')
    setName(user?.displayName || '')
  }, [user])

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
  function onSubmitAccount(e) {
    e.preventDefault()
    const emailChange = email && email !== user.email
    emailChange
      ? updateUserEmailMutation.mutate({ email, password })
      : updateUserPasswordMutation.mutate({ email, password })
    setEditingAccount(false)
  }
  async function onSubmitProfile(e) {
    e.preventDefault()
    updateUserProfileMutation.mutate({ displayName: name })
    setEditingProfile(false)
  }
  function resetAccount() {
    setEmail(user.email)
    setPassword('')
    setEditingAccount(false)
  }
  function resetProfile() {
    setName(user.displayName || '')
    setEditingProfile(false)
  }

  return (
    <CenterAndLimitWidth>
      {isLoading ? (
        'Loading...'
      ) : isError ? (
        <p>Error: {error.message}</p>
      ) : (
        <>
          <AccountForm
            editing={editingAccount}
            email={email}
            formFeedback={feedbackAccount}
            handleEmailChange={handleEmailChange}
            handlePasswordChange={handlePasswordChange}
            onSubmit={onSubmitAccount}
            password={password}
            reset={resetAccount}
          />
          <ProfileForm
            editing={editingProfile}
            formFeedback={feedbackProfile}
            handleDisplayNameChange={handleDisplayNameChange}
            name={name}
            onSubmit={onSubmitProfile}
            reset={resetProfile}
          />
        </>
      )}
    </CenterAndLimitWidth>
  )
}
