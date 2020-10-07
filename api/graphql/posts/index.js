import fs from 'fs'
import path from 'path'

import {
  getPostsResolver,
  getPostsByType,
  getPostById,
  getPostsByFilter,
  createPost,
  updatePost,
  deletePost,
} from './resolver'

const resolvers = {
  Query: {
    getPostsByType: getPostsResolver(async ({ type }, ctx) => await getPostsByType(type)),
    getPostById: getPostsResolver(async ({ id }, ctx) => await getPostById(id)),
    getPosts: getPostsResolver(async (args, ctx) => await getPostsByFilter(args)),
  },
  Mutation: {
    createPost: getPostsResolver(async (args, ctx) => await createPost(args, ctx)),
    updatePost: getPostsResolver(async (args, ctx) => await updatePost(args, ctx)),
    deletePost: getPostsResolver(async (args, ctx) => await deletePost(args, ctx)),
  },
}

const schema = fs.readFileSync(path.resolve(__dirname, 'postSchema.graphql')).toString()

export default {
  resolvers,
  schema,
}
