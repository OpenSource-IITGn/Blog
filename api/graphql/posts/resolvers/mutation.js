import { PostNotFound, Unauthorized } from '../../../db/exceptions/user'
import { getCategoryByLabel } from './../../categories/resolvers'
import Post from './../../../db/models/post.model'
import errorHandler from './../../../db/exceptions/db'
import { PostLike } from './../../../db/models/post_likes.model'
import { AlreadyLiked, NeverLiked } from './../../../db/exceptions/likes'

// create Post Resolver
export const createPost = async (args, ctx) => {
  // authwall
  if ((ctx.user && !ctx.user.user) || (ctx.user && ctx.user.jwtOriginalError)) {
    return { ok: false, msg: Unauthorized }
  }

  const { title, body, categories, draft, img_url, description } = args
  const userContext = ctx.user
  const userId = userContext.user.id
  const catIds = []
  try {
    await Promise.all(
      Object.values(categories).map(async (label) => {
        const catObject = await getCategoryByLabel(label)
        if (!catObject.msg && catObject.category) {
          const catId = catObject.category.id
          catIds.push({ id: catId })
        }
      })
    )
  } catch (err) {
    console.log('Failed to add categories or Categories missing.')
  }

  try {
    const trx = await Post.startTransaction()
    //TODO: Performance of insertGraph is questionable could be replace with normal multiple inserts
    await Post.query(trx).insertGraph(
      [
        {
          title,
          body,
          author_id: userId,
          likes: 0,
          post_categories: catIds,
          draft: draft,
          img_url: img_url,
          description: description,
        },
      ],
      {
        relate: ['post_categories'],
      }
    )
    await trx.commit()

    return {
      ok: true,
    }
  } catch (err) {
    const { message } = errorHandler(err)
    return {
      ok: false,
      msg: message,
    }
  }
}

export const updatePost = async (args, ctx) => {
  // authwall
  if ((ctx.user && !ctx.user.user) || (ctx.user && ctx.user.jwtOriginalError)) {
    return { type: 'UNAUTHENTICATED', msg: Unauthorized }
  }

  const userContext = ctx.user
  const userId = userContext.user.id
  const { pid, title, body, categories, draft, img_url, description } = args
  const post = await Post.query().findById(pid)

  const catIds = []

  try {
    if (categories) {
      await Promise.all(
        Object.values(categories).map(async (label) => {
          const catObject = await getCategoryByLabel(label)
          if (!catObject.msg && catObject.category) {
            const catId = catObject.category.id
            catIds.push({ id: catId })
          }
        })
      )
    }
  } catch (err) {
    console.log('Failed to add categories or Categories missing.')
  }

  try {
    if (userId.toString() !== post.author_id.toString()) {
      return { type: 'UNAUTHORIZED', msg: Unauthorized }
    }

    const trx = await Post.startTransaction()
    await Post.query(trx).where('id', pid).patch({
      title,
      body,
      draft,
      img_url,
      description,
    })

    if (catIds.length !== 0) {
      // unrelate all categories
      const requiredPost = await Post.query(trx).findById(pid)
      await requiredPost.$relatedQuery('post_categories').unrelate()

      // relate new categories
      await Promise.all(
        Object.values(categories).map(async (label) => {
          const catObject = await getCategoryByLabel(label)
          if (!catObject.msg && catObject.category) {
            await requiredPost.$relatedQuery('post_categories').relate(catObject.category)
          }
        })
      )
    }

    await trx.commit()

    return {
      ok: true,
    }
  } catch (err) {
    const { message } = errorHandler(err)
    return {
      ok: false,
      msg: message,
    }
  }
}

export const deletePost = async (args, ctx) => {
  // authwall
  if ((ctx.user && !ctx.user.user) || (ctx.user && ctx.user.jwtOriginalError)) {
    return { type: 'UNAUTHENTICATED', msg: Unauthorized }
  }
  const userContext = ctx.user
  const userId = userContext.user.id
  const { pid } = args
  const post = await Post.query().findById(pid)

  if (!post) {
    return { type: 'NOT_FOUND', msg: PostNotFound }
  }
  try {
    if (userId.toString() !== post.author_id.toString()) {
      return { type: 'UNAUTHORIZED', msg: Unauthorized }
    }

    await Post.query().delete().where('id', pid)
    return {
      ok: true,
    }
  } catch (err) {
    const { message } = errorHandler(err)
    return {
      ok: false,
      msg: message,
    }
  }
}

export const addReaction = async ({ pid }, ctx) => {
  //authwall
  if ((ctx.user && !ctx.user.user) || (ctx.user && ctx.user.jwtOriginalError)) {
    return { type: 'UNAUTHENTICATED', msg: Unauthorized }
  }

  const userContext = ctx.user
  const userId = userContext.user.id

  try {
    // TODO: Redudant Query - read docs for better way
    const postLike = await PostLike.query().where('post_id', pid).where('user_id', userId)
    if (postLike && postLike.length !== 0) {
      return { ok: false, msg: AlreadyLiked }
    }

    await PostLike.query().insert({
      post_id: pid,
      user_id: userId,
    })

    await Post.query().increment('likes', 1).where('id', pid)

    return { ok: true }
  } catch (err) {
    const { message } = errorHandler(err)
    return {
      ok: false,
      msg: message,
    }
  }
}

export const removeReaction = async ({ pid }, ctx) => {
  //authwall
  if ((ctx.user && !ctx.user.user) || (ctx.user && ctx.user.jwtOriginalError)) {
    return { type: 'UNAUTHENTICATED', msg: Unauthorized }
  }

  const userContext = ctx.user
  const userId = userContext.user.id

  try {
    // TODO: Redudant Query - read docs for better way
    const postLike = await PostLike.query().where('post_id', pid).where('user_id', userId)
    if (!postLike || postLike.length === 0) {
      return { ok: false, msg: NeverLiked }
    }
    await PostLike.query().where('post_id', pid).where('user_id', userId).delete()

    return { ok: true }
  } catch (err) {
    const { message } = errorHandler(err)
    return {
      ok: false,
      msg: message,
    }
  }
}
