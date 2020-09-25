import PostsSchema from './posts'
import UserSchema from './users'
import CommentSchema from './comments'

const resolvers = [PostsSchema.resolvers, UserSchema.resolvers, CommentSchema.resolvers]
const typeDefs = [PostsSchema.schema, UserSchema.schema, CommentSchema.schema]

export default {
  resolvers,
  typeDefs,
}
