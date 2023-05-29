import { gql } from 'graphql-request'
import { useQuery } from '@tanstack/react-query'

import { useCurrentUser } from '@/features/users'
import { capitalize, createGraphQLClient } from '@/features/utils'

async function productsBySeller({ sellerId }) {
  const gqlClient = createGraphQLClient()
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

export function useProductsBySeller({ setCheckMarks }) {
  const { data: user } = useCurrentUser()
  const sellerId = user?.id

  return useQuery({
    enabled: !!sellerId,
    onSuccess: (data) => setCheckMarks(Array(data.length).fill(false)),
    queryFn: () => productsBySeller({ sellerId }),
    queryKey: ['productsBySeller', sellerId],
    retry: false,
  })
}
