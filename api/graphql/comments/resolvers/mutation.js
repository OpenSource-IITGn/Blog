import { Unauthorized, UserNotFound } from './../../../db/exceptions/user'
import Comment from './../../../db/models/comment.model'
import errorHandler from './../../../db/exceptions/db'

export const createComment = async ({ pid, body }, ctx) => {
  // authwall
  if ((ctx.user && !ctx.user.user) || (ctx.user && ctx.user.jwtOriginalError)) {
    return { ok: false, msg: Unauthorized }
  }

  const userContext = ctx.user
  const userId = userContext.user.id

  if (!pid || !userId) {
    return { ok: false, msg: UserNotFound }
  }

  try {
    await Comment.query().insert({
      body: body,
      author_id: userId,
      post_id: pid,
    })

    return { ok: true }
  } catch (err) {
    const { message } = errorHandler(err)
    return { ok: false, msg: message }
  }
}

export const updateComment = async ({ cid, body }, ctx) => {
  // authwall
  if ((ctx.user && !ctx.user.user) || (ctx.user && ctx.user.jwtOriginalError)) {
    return { ok: false, msg: Unauthorized }
  }

  const userContext = ctx.user
  const userId = userContext.user.id

  try {
    //TODO: Two redundant db queries - look objection docs
    const comment = await Comment.query().findById(cid).throwIfNotFound()

    if (userId.toString() !== comment.author_id.toString()) {
      return { ok: false, msg: Unauthorized }
    }

    await Comment.query().findById(cid).patch({
      body: body,
    })

    return { ok: true }
  } catch (err) {
    const { message } = errorHandler(err)
    return { ok: false, msg: message }
  }
}

export const deleteComment = async ({ cid }, ctx) => {
  // authwall
  if ((ctx.user && !ctx.user.user) || (ctx.user && ctx.user.jwtOriginalError)) {
    return { ok: false, msg: Unauthorized }
  }

  const userContext = ctx.user
  const userId = userContext.user.id

  try {
    //TODO: Two redundant db queries - look objection docs
    const comment = await Comment.query().findById(cid).throwIfNotFound()

    if (userId.toString() !== comment.author_id.toString()) {
      return { ok: false, msg: Unauthorized }
    }

    await Comment.query().findById(cid).delete()

    return { ok: true }
  } catch (err) {
    const { message } = errorHandler(err)
    return { ok: false, msg: message }
  }
}
