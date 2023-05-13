import { gql } from 'graphql-request'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { createGraphQLClient } from '@/features/utils'

async function createProduct({
  retrieveAccessToken,
  available,
  imageFileName,
  name,
  price,
  sellerId,
}) {
  const accessToken = await retrieveAccessToken()
  const gqlClient = createGraphQLClient(accessToken)
  const { newProduct } = await gqlClient.request(gql`
    mutation {
      newProduct: insertIntoProductsCollection(
        objects: [
          {
            available: ${available},
            imageFilename: "${imageFileName}",
            name: "${name}",
            price: "${price}",
            sellerId: "${sellerId}",
          }
        ]
      ) {
        affectedCount
        records {
          available
          imageFilename
          name
          price
          sellerId
        }
      }
    }
  `)

  return newProduct
}

export function useCreateProduct({
  failureInsertProduct,
  initialFeedback,
  setFeedback,
  successInsertProduct,
}) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (product) => createProduct(product),
    onSuccess: () => {
      setFeedback(initialFeedback)
      queryClient.invalidateQueries({ queryKey: ['productsBySeller'] })
      setFeedback({ status: 'success', message: successInsertProduct })
    },
    onError: (err) => {
      console.error(err.message)
      setFeedback({ status: 'error', message: failureInsertProduct })
    },
  })
}
