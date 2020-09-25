import fs from 'fs'
import path from 'path'

import { getPostsResolver, getPostsByType, getPostById, getPostsByFilter } from './resolver'

const resolvers = {
  Query: {
    getPostsByType: getPostsResolver(async ({ type }) => await getPostsByType(type)),
    getPostById: getPostsResolver(async ({ id }) => await getPostById(id)),
    getPosts: getPostsResolver(async (args) => await getPostsByFilter(args)),
  },
}

const schema = fs.readFileSync(path.resolve(__dirname, 'postSchema.graphql')).toString()

export default {
  resolvers,
  schema,
}
