import { gql } from 'graphql-request'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { useSellerByProductId } from './use-seller-by-product-id'
import { useCurrentUser } from '@/features/users'
import { createGraphQLClient } from '@/features/utils'

async function createOrder({
  accessToken,
  buyerId,
  failureLoginRequired,
  productId,
  sellerId,
}) {
  if (!buyerId) {
    throw new Error(failureLoginRequired)
  }
  const gqlClient = createGraphQLClient(accessToken)
  const { newOrder } = await gqlClient.request(gql`
    mutation {
      newOrder: insertIntoOrdersCollection(
        objects: [
          {
            buyerId: "${buyerId}",
            productId: "${productId}",
            sellerId: "${sellerId}",
          }
        ]
      ) {
        affectedCount
      }
    }
  `)

  if (newOrder.affectedCount !== 1) {
    throw new Error('Unable to create order')
  }
}

export function useCreateOrder({
  failureCreateOrder,
  failureLoginRequired,
  productId,
  setFormFeedback,
  successCreateOrder,
}) {
  const { data: user } = useCurrentUser()
  const queryClient = useQueryClient()
  const { data: seller } = useSellerByProductId({ productId })

  const accessToken = user?.accessToken
  const buyerId = user?.id
  const sellerId = seller?.id

  return useMutation({
    mutationFn: () =>
      createOrder({
        accessToken,
        buyerId,
        failureLoginRequired,
        productId,
        sellerId,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ordersAsABuyer'] })
      setFormFeedback({ status: 'success', message: successCreateOrder })
    },
    onError: (err) => {
      console.error(err.message)
      setFormFeedback({
        status: 'error',
        message:
          err.message === failureLoginRequired
            ? failureLoginRequired
            : failureCreateOrder,
      })
    },
  })
}
