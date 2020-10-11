import fs from 'fs'
import path from 'path'
import { getPostById, getPostsByType, getPostsByFilter } from './resolvers/query'
import {
  addReaction,
  createPost,
  deletePost,
  removeReaction,
  updatePost,
} from './resolvers/mutation'

export const getPostsResolver = (callback) => async (parent, args, ctx, info) => {
  const postsData = await callback(args, ctx)
  return postsData
}

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
    addReaction: getPostsResolver(async (args, ctx) => await addReaction(args, ctx)),
    removeReaction: getPostsResolver(async (args, ctx) => await removeReaction(args, ctx)),
  },
}

const schema = fs.readFileSync(path.resolve(__dirname, 'postSchema.graphql')).toString()

export default {
  resolvers,
  schema,
}
