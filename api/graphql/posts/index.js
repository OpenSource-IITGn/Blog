import fs from 'fs'
import path from 'path'

import { getPostsResolver, getPostsByType, getPostById } from './controller'

const resolvers = {
  Query: {
    getPostsByType: getPostsResolver(async ({ type }) => await getPostsByType(type)),
    getPostById: getPostsResolver(async ({ id }) => await getPostById(id)),
  },
}

const schema = fs.readFileSync(path.resolve(__dirname, 'postSchema.graphql')).toString()

export default {
  resolvers,
  schema,
}
