import errorHandler from '../../db/exceptions/db'
import User from './../../db/models/user.model'
import { EmailAlreadyRegistered, InvalidCredentials, Unauthorized } from '../../db/exceptions/user'
import jsonwebtoken from 'jsonwebtoken'
import { JWT } from './../../config'
import argon2 from 'argon2'

const comparePassword = (password, hash) => {
  return argon2.verify(hash, password)
}

export const getUserProfile = async (args, ctx) => {
  try {
    const { userId } = args
    if ((ctx.user && !ctx.user.user) || (ctx.user && ctx.user.jwtOriginalError)) {
      return { type: 'UNAUTHENTICATED', msg: Unauthorized }
    }

    const userContext = ctx.user
    const id = userContext.user.id

    if (id !== userId) {
      throw Error('User Unauthorized')
    }
    const userDetails = await User.query()
      .findById(userId)
      .select('id', 'first_name', 'last_name', 'bio', 'email', 'image_url')
      .throwIfNotFound()

    return {
      ok: true,
      user: userDetails,
    }
  } catch (err) {
    let { type, message } = errorHandler(err)
    return {
      ok: false,
      msg: message,
    }
  }
}

export const signIn = async (email, password) => {
  try {
    const users = await User.query().where('email', email).throwIfNotFound()
    const user = users[0]
    const check = await comparePassword(password, user.password)
    if (!check) {
      return {
        ok: false,
        msg: InvalidCredentials,
      }
    }
    const token = jsonwebtoken.sign({ email: user.email, id: user.id }, JWT.SECRET, {
      expiresIn: '1d',
    })
    const userData = {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
    }

    return {
      ok: true,
      token: token,
      user: userData,
    }
  } catch (err) {
    const { message } = errorHandler(err)
    return { ok: false, msg: message }
  }
}

export const signUp = async (email, first_name, last_name, password) => {
  try {
    const hashedPassword = await argon2.hash(password)
    const userData = {
      email,
      first_name,
      last_name,
      password: hashedPassword,
      role_id: 1,
    }
    const user = await User.query().insert(userData)
    if (!user) {
      return {
        ok: false,
        msg: EmailAlreadyRegistered,
      }
    }
    return {
      ok: true,
    }
  } catch (err) {
    let { type, message } = errorHandler(err)
    if (type === 'UniqueViolation') {
      message = EmailAlreadyRegistered
    }
    return {
      ok: false,
      msg: message,
    }
  }
}

export const updateProfile = async (args, ctx) => {
  const { email, first_name, last_name, bio, image_url } = args

  try {
    if ((ctx.user && !ctx.user.user) || (ctx.user && ctx.user.jwtOriginalError)) {
      return { type: 'UNAUTHENTICATED', msg: Unauthorized }
    }

    const userContext = ctx.user
    const userId = userContext.user.id
    const user = await User.query().where('email', email).throwIfNotFound()

    if (user.id === userId) {
      throw Error('UnAuthorized User')
    }

    await User.query().findById(userId).update({
      first_name: first_name,
      last_name: last_name,
      bio: bio,
      image_url: image_url,
    })

    return {
      ok: true,
    }
  } catch (err) {
    let { type, message } = errorHandler(err)
    return {
      ok: false,
      msg: message,
    }
  }
}
