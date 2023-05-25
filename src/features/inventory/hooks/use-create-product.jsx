import { gql } from 'graphql-request'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { useCurrentUser } from '@/features/users'
import { createGraphQLClient } from '@/features/utils'

async function createProduct({
  accessToken,
  available,
  imageFileName,
  name,
  price,
  sellerId,
}) {
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
  setFormFeedback,
  successInsertProduct,
}) {
  const { data: user } = useCurrentUser()
  const queryClient = useQueryClient()

  const userId = user?.id
  const userAccessToken = user?.accessToken

  return useMutation({
    mutationFn: ({ available, imageFileName, name, price }) =>
      createProduct({
        accessToken: userAccessToken,
        available,
        imageFileName,
        name,
        price,
        sellerId: userId,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['productsBySeller'] })
      setFormFeedback({ status: 'success', message: successInsertProduct })
    },
    onError: (err) => {
      console.error(err.message)
      setFormFeedback({ status: 'error', message: failureInsertProduct })
    },
  })
}
