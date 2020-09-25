import fs from 'fs'
import path from 'path'
import { signIn } from './resolver'

export const baseResolver = (callback) => async (parent, args, ctx, info) => {
  const res = await callback(args)
  return res
}

const resolvers = {
  Query: {},
  Mutation: {
    signIn: baseResolver(({ email, password }) => signIn(email, password)),
  },
}

const schema = fs.readFileSync(path.resolve(__dirname, 'userSchema.graphql')).toString()

export default {
  resolvers,
  schema,
}
