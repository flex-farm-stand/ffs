import { GraphQLClient } from 'graphql-request'

const endpoint = `${import.meta.env.VITE_SUPABASE_URL}/graphql/v1`

export const graphQLClient = new GraphQLClient(endpoint, {
  headers: {
    apiKey: import.meta.env.VITE_SUPABASE_ANON_KEY,
    authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY || 'noop'}`,
  },
})
