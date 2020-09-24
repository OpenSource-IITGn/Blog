import User from './../../models/user.model'
import { EmailAlreadyRegistered, InvalidCredentials, UserNotFound } from '../../exceptions/user'

const signUp = async (userData) => {
  let [check] = await User.read({ email: userData.email })
  if (check) throw new EmailAlreadyRegistered()
  await User.create(userData)
}
const signIn = async (userData) => {
  let [user] = await User.read({ email: userData.email })
  if (!user) throw new UserNotFound()
  let check = await User.comparePassword(userData.password, user.password)
  if (!check) throw new InvalidCredentials()
}

export default {
  signUp,
  signIn,
}
