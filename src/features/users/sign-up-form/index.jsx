import { Navigate } from 'react-router-dom'

import { Button, FormGroup } from '@/features/ui/'
import { useAuth } from '@/features/users'

export function SignUpForm({
  email,
  formFeedback,
  handleEmailChange,
  handlePasswordChange,
  handleSubmit,
  password,
}) {
  const auth = useAuth()

  return auth.user ? (
    <Navigate to="/profile" />
  ) : (
    <form onSubmit={handleSubmit}>
      <FormGroup
        placeholder="Enter email"
        type="email"
        value={email}
        onChange={handleEmailChange}
      />
      <FormGroup
        placeholder="Enter password"
        type="password"
        value={password}
        onChange={handlePasswordChange}
      />
      {formFeedback && <p>{formFeedback.message}</p>}
      <Button text="Sign up" type="submit" />
    </form>
  )
}
