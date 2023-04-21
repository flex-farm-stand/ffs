import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

import { fetchOneProduct } from '@/features/gql'
import { ProductDetails } from '@/features/shopping'
import { CenterAndLimitWidth } from '@/features/ui'

export function Product() {
  const { id } = useParams()
  const product = useProduct({ productId: id })

  return (
    <CenterAndLimitWidth>
      <ProductDetails product={product} />
    </CenterAndLimitWidth>
  )
}

function useProduct({ productId }) {
  return useQuery({
    queryKey: ['product', productId],
    queryFn: () => fetchOneProduct({ productId }),
    retry: false,
  })
}
