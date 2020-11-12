import { useQuery } from '@apollo/react-hooks'
import { GET_POSTS_QUERY, GET_POST_BY_ID, GET_POST_BY_TYPE } from './postQuery'
import { GET_USER_PROFILE } from './userQuery'

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

export const useProfileQuery = (variables) => {
  return useQuery(GET_USER_PROFILE, {
    variables: variables,
    fetchPolicy: 'cache-and-network',
  })
}

export const usePostByTypeQuery = (variables) => {
  return useQuery(GET_POST_BY_TYPE, {
    variables: variables,
    fetchPolicy: 'cache-and-network',
  })
}
