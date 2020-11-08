import fs from 'fs'
import path from 'path'
import { signIn, signUp, updateProfile } from './resolver'

export const baseResolver = (callback) => async (parent, args, ctx, info) => {
  const res = await callback(args, ctx)
  return res
}

const resolvers = {
  Query: {},
  Mutation: {
    signIn: baseResolver(({ email, password }) => signIn(email, password)),
    signUp: baseResolver(({ email, first_name, last_name, password }) =>
      signUp(email, first_name, last_name, password)
    ),
    updateProfile: baseResolver(async (args, ctx) => await updateProfile(args, ctx)),
  },
}

const schema = fs.readFileSync(path.resolve(__dirname, 'userSchema.graphql')).toString()

export default {
  resolvers,
  schema,
}
