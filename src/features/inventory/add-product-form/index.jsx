import styled from 'styled-components'

import { Button, ButtonGroup, Form, FormGroup, Title } from '@/features/ui'

const Container = styled.div`
  margin: 2rem auto;
  max-width: 600px;
`

const StyledForm = styled(Form)`
  & {
    max-width: 300px;
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

export function AddProductForm({
  editing,
  handleNameChange,
  handlePriceChange,
  inputRef,
  name,
  onInsert,
  price,
  reset,
}) {
  return (
    <Container>
      <StyledForm onSubmit={onInsert}>
        <ButtonGroup>
          <Title text="Add product" />
          {editing && (
            <FormControls>
              <Button onClick={reset} style="muted">
                Cancel
              </Button>
              <Button type="submit">Add</Button>
            </FormControls>
          )}
        </ButtonGroup>
        <FormGroup
          autoFocus={true}
          label="Name:"
          onChange={handleNameChange}
          placeholder="Enter product name"
          ref={inputRef}
          type="text"
          value={name}
        />
        <FormGroup
          label="Price:"
          onChange={handlePriceChange}
          placeholder="Enter product price"
          type="text"
          value={price}
        />
      </StyledForm>
    </Container>
  )
}
