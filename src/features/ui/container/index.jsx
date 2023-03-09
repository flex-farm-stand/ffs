import styled from 'styled-components'

export const CenterAndLimitWidth = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin: 2rem auto;
  max-width: 600px;
`

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
