import fs from 'fs'
import path from 'path'
import {} from './controller'

const resolvers = {
  Query: {},
}

const schema = fs.readFileSync(path.resolve(__dirname, 'userSchema.graphql')).toString()

export default {
  resolvers,
  schema,
}
