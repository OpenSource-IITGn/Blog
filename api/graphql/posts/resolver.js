import { getPostById, getPostsByType, getPostsByFilter } from './resolvers/query'
import { createPost, deletePost, updatePost } from './resolvers/mutation'
import { handlePostMeta } from './resolvers/helpers'

export const getPostsResolver = (callback) => async (parent, args, ctx, info) => {
  const postsData = await callback(args, ctx)
  return postsData
}

export default {
  getPostsResolver,
  getPostById,
  getPostsByFilter,
  getPostsByType,
  createPost,
  updatePost,
  deletePost,
  handlePostMeta,
}
