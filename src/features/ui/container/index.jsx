import styled from 'styled-components'

export const FlexBetweenAndReorder = styled.div.attrs({
  className: 'flex-between-and-reorder',
})`
  & {
    align-items: center;
    display: flex;
    justify-content: space-between;
  }
  button {
    order: 2;
  }
`

export const FlexBetween = styled.div.attrs({
  className: 'flex-between',
})`
  & {
    align-items: center;
    display: flex;
    justify-content: space-between;
  }
`
