import { useState } from 'react'
import { Link } from 'react-router-dom'

import { Title } from '@/features/ui'
import { SignUpForm, useAuth } from '@/features/users'

export function SignUp() {
  const auth = useAuth()
  const [email, setEmail] = useState('')
  const [formFeedback, setFormFeedback] = useState(null)
  const [password, setPassword] = useState('')

  function handleEmailChange(e) {
    setEmail(e.target.value)
  }
  function handlePasswordChange(e) {
    setPassword(e.target.value)
  }
  async function handleSubmit(e) {
    e.preventDefault()
    const result = await auth.signUp({ email, password })
    setFormFeedback(result)
  }

  return (
    <div>
      <Title text="Sign Up" />
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
      </ul>
      <SignUpForm
        email={email}
        formFeedback={formFeedback}
        handleEmailChange={handleEmailChange}
        handlePasswordChange={handlePasswordChange}
        handleSubmit={handleSubmit}
        password={password}
      />
    </div>
  )
}
