import styled from 'styled-components'

export const ButtonGroup = styled.div.attrs({
  className: 'button-group',
})`
  & {
    align-items: center;
    display: flex;
    justify-content: space-between;
    padding: 0;
  }
  button {
    order: 2;
  }
`
