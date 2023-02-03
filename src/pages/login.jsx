import { useState } from 'react'
import { Link } from 'react-router-dom'

import { Title } from '@/features/ui'
import { LoginForm, useAuth } from '@/features/users'

export function Login() {
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
  async function onSubmit(e) {
    e.preventDefault()
    const result = await auth.loginWithPassword({ email, password })
    setFormFeedback(result)
  }

  return (
    <div>
      <Title text="Login" />
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
      </ul>
      <LoginForm
        email={email}
        formFeedback={formFeedback}
        handleEmailChange={handleEmailChange}
        handlePasswordChange={handlePasswordChange}
        onSubmit={onSubmit}
        password={password}
      />
    </div>
  )
}
