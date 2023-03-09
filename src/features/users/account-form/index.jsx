import styled from 'styled-components'

import {
  Button,
  Form,
  FlexBetween,
  FormFeedback,
  InputLabelPair,
  Title,
} from '@/features/ui'

const StyledForm = styled(Form)`
  & {
    max-width: 400px;
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
      <FlexBetween>
        <Title text="Account details" />
        {editing && (
          <FormControls>
            <Button onClick={reset}>Cancel</Button>
            <Button style="primary" type="submit">
              Update
            </Button>
          </FormControls>
        )}
      </FlexBetween>
      <InputLabelPair
        autoFocus={true}
        label="Email:"
        placeholder="Enter email"
        type="email"
        value={email}
        onChange={handleEmailChange}
      />
      <InputLabelPair
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
