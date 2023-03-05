import styled from 'styled-components'

import {
  Button,
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

export function ProfileForm({
  displayName,
  email,
  formFeedback,
  handleEmailChange,
  handlePasswordChange,
  handleDisplayNameChange,
  password,
  onSubmit,
}) {
  return (
    <Form onSubmit={onSubmit}>
      <Title text="Profile" />
      <FormGroup
        autoFocus={true}
        label={true}
        labelText="Email:"
        placeholder="Enter email"
        type="email"
        value={email}
        onChange={handleEmailChange}
      />
      <FormGroup
        label={true}
        labelText="Password:"
        placeholder="Enter password"
        type="password"
        value={password}
        onChange={handlePasswordChange}
      />
      <FormGroup
        label={true}
        labelText="Name:"
        placeholder="Enter publicly displayed name"
        type="text"
        value={displayName}
        onChange={handleDisplayNameChange}
      />
      <FormFeedback feedback={formFeedback} />
      <Button text="Update" type="submit" />
    </Form>
  )
}
