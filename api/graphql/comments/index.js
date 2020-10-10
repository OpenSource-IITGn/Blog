import fs from 'fs'
import path from 'path'
import { getPostComments } from './resolvers/query'
import { createComment, deleteComment, updateComment } from './resolvers/mutation'

export const commentResolver = (callback) => async (parent, args, ctx, info) => {
  const postsData = await callback(args, ctx)
  return postsData
}

const resolvers = {
  Query: { getPostComments: commentResolver(async (args, ctx) => await getPostComments(args)) },
  Mutation: {
    createComment: commentResolver(async (args, ctx) => await createComment(args, ctx)),
    updateComment: commentResolver(async (args, ctx) => await updateComment(args, ctx)),
    deleteComment: commentResolver(async (args, ctx) => await deleteComment(args, ctx)),
  },
}

const schema = fs.readFileSync(path.resolve(__dirname, 'commentSchema.graphql')).toString()

export default {
  resolvers,
  schema,
}
