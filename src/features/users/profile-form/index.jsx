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

export function ProfileForm({
  editing,
  name,
  formFeedback,
  handleDisplayNameChange,
  onSubmit,
  reset,
}) {
  return (
    <StyledForm onSubmit={onSubmit}>
      <FlexBetween>
        <Title text="Profile" />
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
        label="Name:"
        placeholder="Enter publicly displayed name"
        type="text"
        value={name}
        onChange={handleDisplayNameChange}
      />
      <FormFeedback feedback={formFeedback} />
    </StyledForm>
  )
}
