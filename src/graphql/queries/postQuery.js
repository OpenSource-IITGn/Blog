import gql from 'graphql-tag'

export const GET_POSTS_QUERY = gql`
  query getPosts(
    $user_id: Int
    $category_id: Int
    $pageSize: Int
    $page: Int
    $order: String
    $search_query: String
  ) {
    getPosts(
      search_query: $search_query
      user_id: $user_id
      category_id: $category_id
      pageSize: $pageSize
      page: $page
      order: $order
    ) {
      type
      msg
      total
      posts {
        id
        title
        description
        author_name
        created_at
        likes
        categories
        img_url
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
        id
        title
        post_categories {
          label
        }
        created_at
        img_url
        body
        likes
        current_like
        author {
          id
          first_name
          last_name
          bio
          image_url
        }
        comments {
          id
          body
          updated_at
          created_at
          comment_author {
            id
            first_name
            last_name
          }
        }
      }
    }
  }
`
export const GET_POST_BY_TYPE = gql`
  query getPostsByType($type: String) {
    getPostsByType(type: $type) {
      type
      msg
      total
      posts {
        id
        title
        author_name
        created_at
        likes
        categories
        img_url
      }
    }
  }
`
