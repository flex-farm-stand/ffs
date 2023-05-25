import styled from 'styled-components'

import { capitalize } from '@/features/utils'

const Container = styled.div`
  display: flex;
  gap: 1rem;

  @media (width < 480px) {
    flex-direction: column;
  }
`

const FillerImage = styled.div`
  align-items: center;
  background-color: ${({ theme }) => theme.menu.bg};
  display: flex;
  justify-content: center;
  height: 200px;
  width: 200px;
`

const Name = styled.div`
  font-size: 2rem;

  @media (width < 480px) {
    display: none;
  }
`

const NameTop = styled.div`
  font-size: 2rem;

  @media (width >= 480px) {
    display: none;
  }
`

const ProductImage = styled.img`
  height: auto;
  max-height: 200px;
  max-width: 200px;
  width: auto;
`

const SidePanel = styled.div`
  & {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
`

export function ProductDetails({
  productById: { data, error, isError, isLoading },
}) {
  return (
    <div>
      {isLoading ? (
        'Loading...'
      ) : isError ? (
        <span>Error: {error.message}</span>
      ) : (
        <Container>
          <NameTop>{capitalize(data.name)}</NameTop>
          {data.imageFilename ? (
            <div>
              <ProductImage src={data.imageUrl} />
            </div>
          ) : (
            <FillerImage>Image unavailable</FillerImage>
          )}
          <SidePanel>
            <Name>{capitalize(data.name)}</Name>
            <div>{'$' + data.price}</div>
            <div>Sold by: {data.seller.displayName}</div>
          </SidePanel>
        </Container>
      )}
    </div>
  )
}
