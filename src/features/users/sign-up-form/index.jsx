import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { ThemeContext } from 'styled-components'

import {
  Button,
  ButtonGroup,
  Form,
  FormFeedback,
  FormGroup,
  LogoLink,
  Title,
} from '@/features/ui'

export function SignUpForm({
  email,
  formFeedback,
  handleEmailChange,
  handlePasswordChange,
  onSubmit,
  password,
}) {
  const themeContext = useContext(ThemeContext)

  return (
    <Form onSubmit={onSubmit}>
      <LogoLink color={themeContext.form.title} displayText={true} />
      <Title text="Sign up" />
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
      <FormFeedback feedback={formFeedback} />
      <ButtonGroup>
        <Button text="Create account" type="submit" />
        <Link to="/login">Login instead</Link>
      </ButtonGroup>
    </Form>
  )
}
