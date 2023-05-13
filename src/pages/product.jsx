import { useParams } from 'react-router-dom'

import { useFetchProductById, ProductDetails } from '@/features/shopping'
import { CenterAndLimitWidth } from '@/features/ui'

export function Product() {
  const { id } = useParams()
  const fetchProductById = useFetchProductById({ productId: id })

  return (
    <CenterAndLimitWidth>
      <ProductDetails fetchProductById={fetchProductById} />
    </CenterAndLimitWidth>
  )
}
