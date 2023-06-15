import { gql } from 'graphql-request'
import { useQuery } from '@tanstack/react-query'

import { createGraphQLClient } from '@/features/utils'

async function sellerByProductId({ productId }) {
  const gqlClient = createGraphQLClient()
  const { seller } = await gqlClient.request(gql`
    {
      seller: productsCollection(
        filter: { id: { eq: "${productId}" } }
      ) {
        edges {
          node {
            seller {
              id
            }
          }
        }
      }
    }
  `)

  return seller.edges[0].node.seller
}

export function useSellerByProductId({ productId }) {
  return useQuery({
    queryKey: ['sellerByProductId', productId],
    queryFn: () => sellerByProductId({ productId }),
    retry: false,
  })
}
