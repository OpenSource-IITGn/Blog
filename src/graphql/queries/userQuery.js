import gql from 'graphql-tag'

export const GET_USER_PROFILE = gql`
  query getUserProfile($userId: Int!) {
    getUserProfile(userId: $userId) {
      ok
      msg
      user {
        id
        first_name
        last_name
        bio
        email
        image_url
      }
    }
  }
`
