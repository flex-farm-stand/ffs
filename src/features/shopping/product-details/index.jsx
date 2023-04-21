import styled from 'styled-components'

import { capitalize } from '@/features/utils'
import { useSupabaseClient } from '@/features/supabase'

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

export function ProductDetails({ product }) {
  const supabase = useSupabaseClient()
  return (
    <div>
      {product.status === 'loading' ? (
        'Loading...'
      ) : product.status === 'error' ? (
        <span>Error: {product.error.message}</span>
      ) : (
        <Container>
          <NameTop>{capitalize(product.data.name)}</NameTop>
          {product.data.imageFilename ? (
            <div>
              <ProductImage
                src={
                  supabase.storage
                    .from('product_images')
                    .getPublicUrl(product.data.imageFilename).data.publicUrl
                }
              />
            </div>
          ) : (
            <FillerImage>Image unavailable</FillerImage>
          )}
          <SidePanel>
            <Name>{capitalize(product.data.name)}</Name>
            <div>{'$' + product.data.price}</div>
            <div>Sold by: {product.data.seller.displayName}</div>
          </SidePanel>
        </Container>
      )}
    </div>
  )
}
