import { useQuery } from '@apollo/react-hooks'
import { GET_POSTS_QUERY } from './postQuery'

export const usePostsQuery = (variables) => {
  return useQuery(GET_POSTS_QUERY, {
    variables: variables,
    fetchPolicy: 'cache-and-network',
  })
}
