import { gql } from 'graphql-request'
import { useQuery } from '@tanstack/react-query'

import { createGraphQLClient } from '@/features/utils'

async function fetchProductById({ productId }) {
  const gqlClient = createGraphQLClient()
  const { products } = await gqlClient.request(gql`
    query {
      products: productsCollection(
        filter: { id: { eq: "${productId}" } }
      ) {
        edges {
          node {
            name
            price
            seller {
              id
              displayName
            }
            imageFilename
          }
        }
      }
    }
  `)

  return products?.edges[0].node
}

export function useFetchProductById({ productId }) {
  return useQuery({
    queryKey: ['product', productId],
    queryFn: () => fetchProductById({ productId }),
    retry: false,
  })
}
