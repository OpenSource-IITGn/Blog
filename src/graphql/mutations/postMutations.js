import gql from 'graphql-tag'

export const CREATE_POST_MUTATION = gql`
    mutation createPost(
        $title: String!
        $body: String!
        $categories: Categories!
        $img_url: String
        $description: String
    ) {
        createPost(
            title: $title
            body: $body
            categories: $categories
            img_url: $img_url
            description: $description
        ) {
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
        $description: String
    ) {
        updatePost(
            pid: $pid
            title: $title
            body: $body
            categories: $categories
            draft: $draft
            img_url: $img_url
            description: $description
        ) {
            ok
            msg
        }
    }
`

export const DELETE_POST_MUTATION = gql`
    mutation deletePost($pid: Int!) {
        deletePost(pid: $pid) {
            ok
            msg
        }
    }
`
