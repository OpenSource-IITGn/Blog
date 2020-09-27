import PostsSchema from './posts'
import UserSchema from './users'
import CommentSchema from './comments'
import CategorySchema from './categories'

const resolvers = [
  PostsSchema.resolvers,
  UserSchema.resolvers,
  CommentSchema.resolvers,
  CategorySchema.resolvers,
]
const typeDefs = [
  PostsSchema.schema,
  UserSchema.schema,
  CommentSchema.schema,
  CategorySchema.schema,
]

export default {
  resolvers,
  typeDefs,
}
