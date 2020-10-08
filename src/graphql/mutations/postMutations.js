import gql from 'graphql-tag'

export const CREATE_POST_MUTATION = gql`
  mutation createPost($title: String!, $body: String!, $categories: Categories!) {
    createPost(title: $title, body: $body, categories: $categories) {
      ok
      msg
    }
  }
`

export const UPDATE_POST_MUTATION = gql`
  mutation updatePost(
    $pid: Int!
    $title: String
    $body: String
    $categories: Categories
    $draft: Boolean
  ) {
    updatePost(pid: $pid, title: $title, body: $body, categories: $categories, draft: $draft) {
      ok
      msg
    }
  }
`
