import { useQuery } from '@apollo/react-hooks'
import { GET_POSTS_QUERY, GET_POST_BY_ID } from './postQuery'

export const usePostsQuery = (variables) => {
  return useQuery(GET_POSTS_QUERY, {
    variables: variables,
    fetchPolicy: 'cache-and-network',
  })
}

export const usePostQuery = (variables, skip) => {
  return useQuery(GET_POST_BY_ID, {
    variables: variables,
    fetchPolicy: 'cache-and-network',
    skip: skip,
  })
}
