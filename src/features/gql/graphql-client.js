import { GraphQLClient } from 'graphql-request'

const endpoint = `${import.meta.env.VITE_SUPABASE_URL}/graphql/v1`

export function createClient(accessToken) {
  const headers = {
    apiKey: import.meta.env.VITE_SUPABASE_ANON_KEY,
  }
  // Mutations require a GQL client with access token
  // If token is provided, use it
  if (accessToken) {
    headers.authorization = `Bearer ${accessToken}`
  }
  const client = new GraphQLClient(endpoint, {
    headers,
  })

  return client
}
