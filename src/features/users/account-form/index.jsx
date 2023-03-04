import styled from 'styled-components'

import {
  Button,
  ButtonGroup,
  Form,
  FormFeedback,
  FormGroup,
  Title,
} from '@/features/ui'

const StyledForm = styled(Form)`
  & {
    margin: 0 auto;
    max-width: 400px;
    padding: 2rem;
  }
  /*
    Math for input width
    row = 100%
    row = label + input
    label = 20%
    input = row - label - labelMarginRight - 2*inputBorderWidth - 2*inputPadding
    input = 100% - 20% - 15px - 2*2px - 2*0.4rem
    input = 80% - 15px - 4px - 0.8rem
  */
  input {
    width: calc(80% - 15px - 4px - 0.8rem);
  }
`

const FormControls = styled.div`
  & {
    display: flex;
  }
  button {
    font-size: 0.8rem;
  }
  button:first-child {
    margin-right: 5px;
  }
`

export function AccountForm({
  editing,
  email,
  formFeedback,
  handleEmailChange,
  handlePasswordChange,
  onSubmit,
  password,
  reset,
}) {
  return (
    <StyledForm onSubmit={onSubmit}>
      <ButtonGroup>
        <Title text="Account details" />
        {editing && (
          <FormControls>
            <Button onClick={reset} style="muted">
              Cancel
            </Button>
            <Button type="submit">Update</Button>
          </FormControls>
        )}
      </ButtonGroup>
      <FormGroup
        autoFocus={true}
        label="Email:"
        placeholder="Enter email"
        type="email"
        value={email}
        onChange={handleEmailChange}
      />
      <FormGroup
        label="Password:"
        placeholder="Enter password"
        type="password"
        value={password}
        onChange={handlePasswordChange}
      />
      <FormFeedback feedback={formFeedback} />
    </StyledForm>
  )
}
