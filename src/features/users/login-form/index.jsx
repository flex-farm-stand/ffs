import { useContext } from 'react'
import { Link } from 'react-router-dom'
import styled, { ThemeContext } from 'styled-components'

import {
  Button,
  Form,
  FlexBetweenAndReorder,
  FormFeedback,
  InputLabelPair,
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

export function LoginForm({
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
      <Title text="Login" />
      <InputLabelPair
        autoFocus={true}
        placeholder="Enter email"
        type="email"
        value={email}
        onChange={handleEmailChange}
      />
      <InputLabelPair
        placeholder="Enter password"
        type="password"
        value={password}
        onChange={handlePasswordChange}
      />
      <FormFeedback feedback={formFeedback} />
      <FlexBetweenAndReorder>
        <Button style="primary" type="submit">
          Login
        </Button>
        <Link to="/signup">Create account</Link>
      </FlexBetweenAndReorder>
    </StyledForm>
  )
}
