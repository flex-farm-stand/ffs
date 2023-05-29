import styled from 'styled-components'

import {
  Button,
  ButtonLabelPair,
  FlexBetween,
  Form,
  FormFeedback,
  InputLabelPair,
  Title,
} from '@/features/ui'

const Container = styled.div`
  display: flex;
  gap: 0.5rem;
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
  /*
    Math for button width
    row = 100%
    row = label + button
    label = 20%
    input = row - label - labelMarginRight
    input = 100% - 20% - 15px
    input = 80% - 15px
  */
  .button-label-pair button {
    display: inline-block;
    width: calc(80% - 15px);
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

const HiddenFileInput = styled.input`
  display: none;
`

const ImagePreview = styled.div`
  img {
    height: auto;
    max-height: 150px;
    max-width: 150px;
    width: auto;
  }
`

export function AddProductForm({
  editing,
  formFeedback,
  handleFileChange,
  handleNameChange,
  handlePriceChange,
  imageUrl,
  inputRef,
  name,
  onSubmit,
  price,
  reset,
  uploading,
}) {
  return (
    <Container>
      <StyledForm onSubmit={onSubmit}>
        <FlexBetween>
          <Title text="Add product" />
          {editing && (
            <FormControls>
              <Button onClick={reset}>Cancel</Button>
              <Button style="primary" type="submit">
                Add
              </Button>
            </FormControls>
          )}
        </FlexBetween>
        <InputLabelPair
          autoFocus={true}
          label="Name:"
          onChange={handleNameChange}
          placeholder="Enter product name"
          ref={inputRef}
          type="text"
          value={name}
        />
        <InputLabelPair
          label="Price:"
          onChange={handlePriceChange}
          placeholder="Enter product price"
          type="text"
          value={price}
        />
        <ButtonLabelPair label="Image:">
          <Button type="button">
            <label htmlFor="productInput">
              {uploading ? 'Uploading' : imageUrl ? 'Replace...' : 'Choose...'}
            </label>
          </Button>
        </ButtonLabelPair>
        <HiddenFileInput
          accept=".jpg, .jpeg, .png"
          disabled={uploading}
          id="productInput"
          onChange={handleFileChange}
          type="file"
        />
        <FormFeedback feedback={formFeedback} />
      </StyledForm>
      <ImagePreview>{imageUrl && <img src={imageUrl} />}</ImagePreview>
    </Container>
  )
}
