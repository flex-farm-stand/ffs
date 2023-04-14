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

const DetachedLabel = styled.div`
  & {
    display: flex;
    font-size: 0.9rem;
    justify-content: space-between;
  }
  button {
    font-size: 0.9rem;
    padding: 0;
  }
`

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

const InputLabelPairShifted = styled(InputLabelPair)`
  order: 1;
`

const FormFeedbackShifted = styled(FormFeedback)`
  order: 1;
`

const FlexBetweenAndReorderShifted = styled(FlexBetweenAndReorder)`
  order: 1;
`

export function LoginForm({
  email,
  formFeedback,
  handleEmailChange,
  handlePasswordChange,
  onSubmit,
  password,
  resetPassword,
}) {
  const themeContext = useContext(ThemeContext)

  return (
    <StyledForm onSubmit={onSubmit}>
      <LogoLink color={themeContext.form.title} displayText={true} />
      <Title text="Login" />
      <DetachedLabel>
        <label>Email</label>
      </DetachedLabel>
      <InputLabelPair
        autoFocus={true}
        onChange={handleEmailChange}
        placeholder="you@example.com"
        type="email"
        value={email}
      />
      <InputLabelPairShifted
        onChange={handlePasswordChange}
        placeholder="••••••••"
        type="password"
        value={password}
      />
      <FormFeedbackShifted feedback={formFeedback} />
      <FlexBetweenAndReorderShifted>
        <Button style="primary" type="submit">
          Login
        </Button>
        <Link to="/signup">Create account</Link>
      </FlexBetweenAndReorderShifted>
      <DetachedLabel>
        <label>Password</label>
        <Button disabled={false} style="text" onClick={resetPassword}>
          Forgot password?
        </Button>
      </DetachedLabel>
    </StyledForm>
  )
}
