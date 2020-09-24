import fs from 'fs'
import path from 'path'

import trendingPosts from '../mocks/trending'
import featuredPosts from '../mocks/featured'
import { getPostsResolver, getPosts } from './controller'

const resolvers = {
  Query: {
    trendingPosts: () => trendingPosts,
    featuredPosts: () => featuredPosts,
    recentPosts: () => [...trendingPosts, ...featuredPosts, ...trendingPosts],
    getPostsByType: getPostsResolver(async ({ type }) => await getPosts(type)),
  },
}

const schema = fs.readFileSync(path.resolve(__dirname, 'postSchema.graphql')).toString()

export default {
  resolvers,
  schema,
}
