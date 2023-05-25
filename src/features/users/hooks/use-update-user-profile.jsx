import { gql } from 'graphql-request'
import { useMutation } from '@tanstack/react-query'

import { useCurrentUser } from './use-current-user'
import { createGraphQLClient } from '@/features/utils'

async function updateUserProfile({ displayName, userAccessToken, userId }) {
  const gqlClient = createGraphQLClient(userAccessToken)

  const { profile } = await gqlClient.request(gql`
    mutation {
      profile: updateProfilesCollection(
        set: {displayName: "${displayName}"}
        filter: {id: {eq: "${userId}"}}
      ) {
        affectedCount
      }
    }
  `)

  if (profile.affectedCount !== 1) {
    throw new Error('Unable to mutate profile')
  }
}
// Use dependent queries, as discussed here:
// https://tanstack.com/query/v4/docs/react/guides/dependent-queries
export function useUpdateUserProfile({ setFormFeedback, successNameChange }) {
  // Get current user
  const { data: user } = useCurrentUser()
  const userId = user?.id
  const userAccessToken = user?.accessToken

  return useMutation({
    mutationFn: ({ displayName }) =>
      updateUserProfile({ displayName, userAccessToken, userId }),
    onSuccess: () => {
      setFormFeedback({ status: 'success', message: successNameChange })
    },
    onError: (err) => {
      console.error(err.message)
      setFormFeedback({ status: 'error', message: err.message })
    },
  })
}
