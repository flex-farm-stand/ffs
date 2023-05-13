import { gql } from 'graphql-request'
import { useQuery } from '@tanstack/react-query'

import { capitalize } from '@/features/utils'
import { createClient } from '@/features/gql/graphql-client'

async function fetchProductsBySeller({ sellerId }) {
  const gqlClient = createClient()
  const { products } = await gqlClient.request(gql`
    query {
      products: productsCollection(
        filter: { sellerId: { eq: "${sellerId}" } }
      ) {
        edges {
          node {
            dateAdded
            id,
            name
            price
          }
        }
      }
    }
  `)

  return products?.edges.map((d, i) => ({
    dateAdded: new Date(d.node.dateAdded).toDateString(),
    index: '' + ++i,
    name: capitalize(d.node.name),
    price: '$' + (+d.node.price).toFixed(2),
    url: `/product/${d.node.id}`,
  }))
}

export function useFetchProductsBySeller({ sellerId, setCheckMarks }) {
  return useQuery({
    onSuccess: (data) => setCheckMarks(Array(data.length).fill(false)),
    queryFn: () => fetchProductsBySeller({ sellerId }),
    queryKey: ['productsBySeller', sellerId],
    retry: false,
  })
}
