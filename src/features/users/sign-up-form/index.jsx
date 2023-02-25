import { useContext } from 'react'
import { Link } from 'react-router-dom'
import styled, { ThemeContext } from 'styled-components'

import {
  Button,
  ButtonGroup,
  Form,
  FormFeedback,
  FormGroup,
  LogoLink,
  Title,
} from '@/features/ui'

const StyledForm = styled(Form)`
  & {
    border: 1px solid ${({ theme }) => theme.form.border};
    border-radius: 5px;
    margin: 20% auto;
    max-width: 300px;
    padding: 2rem;
  }
  input {
    width: calc(100% - 0.8rem);
  }
`

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
    <StyledForm onSubmit={onSubmit}>
      <LogoLink color={themeContext.form.title} displayText={true} />
      <Title text="Sign up" />
      <FormGroup
        autoFocus={true}
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
        <Button text="Create" type="submit" />
        <Link to="/login">Login instead</Link>
      </ButtonGroup>
    </StyledForm>
  )
}
