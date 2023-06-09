import { useState } from 'react'
import { useParams } from 'react-router-dom'

import {
  useCreateOrder,
  useProductById,
  ProductDetails,
} from '@/features/shopping'
import { CenterAndLimitWidth } from '@/features/ui'

// Initial state
const initialFeedback = { status: '', message: '' }

// Form feedback messages
const successCreateOrder = 'Order successfully submitted'
const failureCreateOrder = 'Unable to place order'
const failureLoginRequired = 'Must login to buy a product'

export function Product() {
  const { id } = useParams()
  const [formFeedback, setFormFeedback] = useState(initialFeedback)

  // Fetching hooks
  const productById = useProductById({ productId: id })
  const createOrderMutation = useCreateOrder({
    failureCreateOrder,
    failureLoginRequired,
    productId: id,
    setFormFeedback,
    successCreateOrder,
  })

  function onClick() {
    createOrderMutation.mutate()
  }

  return (
    <CenterAndLimitWidth>
      <ProductDetails
        formFeedback={formFeedback}
        onClick={onClick}
        productById={productById}
      />
    </CenterAndLimitWidth>
  )
}
