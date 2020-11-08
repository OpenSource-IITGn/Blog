import gql from 'graphql-tag'

export const UPDATE_PROFILE_MUTATION = gql`
  mutation updateProfile(
    $first_name: String
    $last_name: String
    $bio: String
    $image_url: String
    $email: String!
  ) {
    updateProfile(
      first_name: $first_name
      last_name: $last_name
      bio: $bio
      image_url: $image_url
      email: $email
    ) {
      ok
      msg
    }
  }
`
