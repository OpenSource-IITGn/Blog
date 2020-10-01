import gql from 'graphql-tag'

export const POST_MUTATION = `
    createPost(title: String, body: String!, categories: Categories!): QueryResponse!

`
