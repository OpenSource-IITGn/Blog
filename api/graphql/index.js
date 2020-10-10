import fs from 'fs'
import path from 'path'

import PostsSchema from './posts'
import UserSchema from './users'
import CommentSchema from './comments'
import CategorySchema from './categories'

const Queries = fs.readFileSync(path.resolve(__dirname, 'query.graphql')).toString()
const Mutations = fs.readFileSync(path.resolve(__dirname, 'mutations.graphql')).toString()

const resolvers = [
  PostsSchema.resolvers,
  UserSchema.resolvers,
  CommentSchema.resolvers,
  CategorySchema.resolvers,
]

const typeDefs = [
  Queries,
  Mutations,
  PostsSchema.schema,
  UserSchema.schema,
  CommentSchema.schema,
  CategorySchema.schema,
]

export default {
  resolvers,
  typeDefs,
}
