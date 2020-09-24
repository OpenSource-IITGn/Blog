import PostsSchema from './posts'

const resolvers = [PostsSchema.resolvers]
console.log(resolvers[0].Query)
const typeDefs = [PostsSchema.schema]

export default {
  resolvers,
  typeDefs,
}
