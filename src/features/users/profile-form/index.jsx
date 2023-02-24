import styled from 'styled-components'

import {
  Button,
  ButtonGroup,
  Form as OriginalForm,
  FormFeedback,
  FormGroup,
  Title,
} from '@/features/ui'

const Form = styled(OriginalForm)`
  & {
    border: none;
    margin: 0 auto;
    max-width: 400px;
  }
  label {
    display: inline-block;
    margin-right: 15px;
    text-align: left;
    width: 20%;
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
    <Form onSubmit={onSubmit}>
      <ButtonGroup>
        <Title text="Profile" />
        {editing && (
          <FormControls>
            <Button onClick={reset} style="muted" text="Cancel" />
            <Button text="Update" type="submit" />
          </FormControls>
        )}
      </ButtonGroup>
      <FormGroup
        label={true}
        labelText="Name:"
        placeholder="Enter publicly displayed name"
        type="text"
        value={name}
        onChange={handleDisplayNameChange}
      />
      <FormFeedback feedback={formFeedback} />
    </Form>
  )
}
