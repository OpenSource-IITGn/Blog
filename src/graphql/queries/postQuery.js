import gql from 'graphql-tag'

export const GET_POSTS_QUERY = gql`
  query getPosts($user_id: Int, $category_id: Int, $pageSize: Int, $page: Int, $order: String) {
    getPosts(
      user_id: $user_id
      category_id: $category_id
      pageSize: $pageSize
      page: $page
      order: $order
    ) {
      type
      msg
      posts {
        id
        title
        description
        author_name
        created_at
        likes
        categories
        image
      }
    }
  }
`
export const GET_POST_BY_ID = gql`
  query getPostById($id: Int) {
    getPostById(id: $id) {
      msg
      type
      post {
        title
        post_categories {
          label
        }
        created_at
        image
        description
        body
        likes
        author {
          id
          first_name
          last_name
        }
        comments {
          id
          body
          comment_author {
            first_name
            last_name
          }
        }
      }
    }
  }
`