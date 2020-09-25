import fs from 'fs'
import path from 'path'

import trendingPosts from '../mocks/trending'
import featuredPosts from '../mocks/featured'
import { getPostsResolver, getPosts, getPostById } from './controller'

const resolvers = {
  Query: {
    getPostsByType: getPostsResolver(async ({ type }) => await getPosts(type)),
    getPostsById: getPostsResolver(async ({ id }) => await getPostById(id)),
  },
}

const schema = fs.readFileSync(path.resolve(__dirname, 'postSchema.graphql')).toString()

export default {
  resolvers,
  schema,
}
