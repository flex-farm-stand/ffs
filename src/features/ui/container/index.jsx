import styled from 'styled-components'

export const CenterAndLimitWidth = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-width: 600px;
  padding: 5px;

  @media (width < 480px) {
    margin: 0.5rem auto;
  }
  @media (width >= 480px) {
    margin: 1rem auto;
  }
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
