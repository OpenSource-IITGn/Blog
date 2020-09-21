import PostsSchema from './posts'

const resolvers = [PostsSchema.resolvers]
const typeDefs = [PostsSchema.schema]

export default {
  resolvers,
  typeDefs,
}
