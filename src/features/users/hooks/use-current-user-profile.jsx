import { gql } from 'graphql-request'
import { useQuery } from '@tanstack/react-query'

import { useCurrentUser } from './use-current-user'
import { createGraphQLClient } from '@/features/utils'

async function getCurrentUserProfile(user) {
  const gqlClient = createGraphQLClient()

  if (!user.id) {
    throw new Error('User is not authenticated')
  }

  const { profile } = await gqlClient.request(gql`
    query {
      profile: profilesCollection(
        filter: { id: { eq: "${user.id}" } }
        first: 1
      ) {
        edges {
          node {
            displayName
          }
        }
      }
    }
  `)

  return { ...user, displayName: profile?.edges[0].node.displayName }
}

// Use dependent queries, as discussed here:
// https://tanstack.com/query/v4/docs/react/guides/dependent-queries
export function useCurrentUserProfile() {
  // Get current user
  const { data: user } = useCurrentUser()
  const userId = user?.id

  // Get profile
  return useQuery({
    enabled: !!userId,
    queryFn: () => getCurrentUserProfile(user),
    queryKey: ['profile', user],
    retry: false,
  })
}
