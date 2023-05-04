import { gql } from 'graphql-request'

import { createClient } from './graphql-client'

export async function fetchOneProduct({ productId }) {
  const gqlClient = createClient()
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
