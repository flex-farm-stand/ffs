import { gql } from 'graphql-request'
import { useQuery } from '@tanstack/react-query'

import { useCurrentUser } from '@/features/users'
import { createGraphQLClient } from '@/features/utils'

async function ordersAsABuyer({ accessToken, buyerId }) {
  const gqlClient = createGraphQLClient(accessToken)
  const { orders } = await gqlClient.request(gql`
    {
      orders: ordersCollection(
        filter: { buyerId: { eq: "${buyerId}" } }
      ) {
        edges {
          node {
            id
            dateAdded
            seller {
              displayName
            }
            product {
              price
            }
          }
        }
      }
    }
  `)
  console.log(orders)

  return orders?.edges.map(({ node: order }) => ({
    date: new Date(order.dateAdded).toDateString(),
    id: order.id,
    price: '$' + (+order.product.price).toFixed(2),
    seller: order.seller.displayName,
  }))
}

export function useOrdersAsABuyer() {
  const { data: user } = useCurrentUser()
  const accessToken = user?.accessToken
  const buyerId = user?.id

  return useQuery({
    enabled: !!buyerId,
    queryFn: () => ordersAsABuyer({ accessToken, buyerId }),
    queryKey: ['productsBySeller', buyerId],
    retry: false,
  })
}
