import gql from 'graphql-tag'

export const CREATE_POST_MUTATION = gql`
  mutation createPost($title: String!, $body: String!, $categories: Categories!, $img_url: String) {
    createPost(title: $title, body: $body, categories: $categories, img_url: $img_url) {
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
    $img_url: String
  ) {
    updatePost(
      pid: $pid
      title: $title
      body: $body
      categories: $categories
      draft: $draft
      img_url: $img_url
    ) {
      ok
      msg
    }
  }
`
