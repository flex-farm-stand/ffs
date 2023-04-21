import { gql } from 'graphql-request'

import { createClient } from './graphql-client'

export async function insertProduct({
  retrieveAccessToken,
  available,
  imageFileName,
  name,
  price,
  sellerId,
}) {
  const accessToken = await retrieveAccessToken()
  const gqlClient = createClient(accessToken)
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
