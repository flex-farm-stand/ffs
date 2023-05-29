import { gql } from 'graphql-request'
import { useQuery } from '@tanstack/react-query'

import { useSupabaseClient } from '@/features/supabase'
import { createGraphQLClient } from '@/features/utils'

async function productById({ productId, supabase }) {
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

  const product = products.edges[0].node

  // Include URL to product image in returned object
  if (product.imageFilename) {
    const {
      data: { publicUrl },
    } = supabase.storage
      .from('product_images')
      .getPublicUrl(product.imageFilename)
    product.imageUrl = publicUrl
  }

  return product
}

export function useProductById({ productId }) {
  const supabase = useSupabaseClient()

  return useQuery({
    queryKey: ['product', productId],
    queryFn: () => productById({ productId, supabase }),
    retry: false,
  })
}
