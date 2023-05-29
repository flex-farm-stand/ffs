import { useParams } from 'react-router-dom'

import { useProductById, ProductDetails } from '@/features/shopping'
import { CenterAndLimitWidth } from '@/features/ui'

export function Product() {
  const { id } = useParams()
  const productById = useProductById({ productId: id })

  return (
    <CenterAndLimitWidth>
      <ProductDetails productById={productById} />
    </CenterAndLimitWidth>
  )
}
