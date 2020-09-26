import fs from 'fs'
import path from 'path'

import { getPostsResolver, getPostsByType, getPostById, getPostsByFilter } from './resolver'

const resolvers = {
  Query: {
    getPostsByType: getPostsResolver(async ({ type }, ctx) => await getPostsByType(type)),
    getPostById: getPostsResolver(async ({ id }, ctx) => await getPostById(id, ctx)),
    getPosts: getPostsResolver(async (args, ctx) => await getPostsByFilter(args)),
  },
}

const schema = fs.readFileSync(path.resolve(__dirname, 'postSchema.graphql')).toString()

export default {
  resolvers,
  schema,
}
