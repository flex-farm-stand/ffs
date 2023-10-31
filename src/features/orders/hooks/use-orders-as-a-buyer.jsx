import { gql } from 'graphql-request'
import { useQuery } from '@tanstack/react-query'

import { useCurrentUser } from '@/features/users'
import { useSupabaseClient } from '@/features/supabase'
import { createGraphQLClient } from '@/features/utils'

async function ordersAsABuyer({ accessToken, buyerId, supabase }) {
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
              imageFilename
              name
              price
            }
          }
        }
      }
    }
  `)

  return orders?.edges.map(({ node: order }) => ({
    date: order.dateAdded,
    id: order.id,
    imageUrl: order.product.imageFilename
      ? supabase.storage
          .from('product_images')
          .getPublicUrl(order.product.imageFilename)?.data.publicUrl
      : '',
    name: order.product.name,
    price: '$' + (+order.product.price).toFixed(2),
    seller: order.seller.displayName,
  }))
}

export function useOrdersAsABuyer() {
  const { data: user } = useCurrentUser()
  const supabase = useSupabaseClient()
  const accessToken = user?.accessToken
  const buyerId = user?.id

  return useQuery({
    enabled: !!buyerId,
    queryFn: () => ordersAsABuyer({ accessToken, buyerId, supabase }),
    queryKey: ['ordersAsABuyer'],
    retry: false,
  })
}
