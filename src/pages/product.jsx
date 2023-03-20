import { gql } from 'graphql-request'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

import { graphQLClient } from '@/features/gql'
import { ProductDetails } from '@/features/shopping'
import { CenterAndLimitWidth } from '@/features/ui'

export function Product() {
  const { id } = useParams()
  const { status, data, error } = useProduct({ id })

  return (
    <CenterAndLimitWidth>
      <ProductDetails status={status} data={data} error={error} />
    </CenterAndLimitWidth>
  )
}

function useProduct({ id }) {
  return useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      const { products } = await graphQLClient.request(
        gql`
          query {
            products: productsCollection(
              filter: { id: { eq: "${id}" } }
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
        `
      )
      return products?.edges[0].node
    },
    retry: false,
  })
}
