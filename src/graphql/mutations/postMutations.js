import gql from 'graphql-tag'

export const CREATE_POST_MUTATION = gql`
  mutation createPost($title: String!, $body: String!, $categories: Categories!) {
    createPost(title: $title, body: $body, categories: $categories) {
      ok
      msg
    }
  }
`
