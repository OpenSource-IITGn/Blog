import fs from 'fs'
import path from 'path'

import PostsSchema from './posts'
import UserSchema from './users'
import CommentSchema from './comments'
import CategorySchema from './categories'

const schema = fs.readFileSync(path.resolve(__dirname, 'mutations.graphql')).toString()

const resolvers = [
  PostsSchema.resolvers,
  UserSchema.resolvers,
  CommentSchema.resolvers,
  CategorySchema.resolvers,
]

const typeDefs = [
  schema,
  PostsSchema.schema,
  UserSchema.schema,
  CommentSchema.schema,
  CategorySchema.schema,
]

export default {
  resolvers,
  typeDefs,
}
