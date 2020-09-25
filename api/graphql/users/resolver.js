import errorHandler from '../../db/exceptions/db'
import User from './../../db/models/user.model'
import { EmailAlreadyRegistered, InvalidCredentials } from '../../db/exceptions/user'
import jsonwebtoken from 'jsonwebtoken'
import { JWT } from './../../config'
import argon2 from 'argon2'

const comparePassword = (password, hash) => {
  return argon2.verify(hash, password)
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
