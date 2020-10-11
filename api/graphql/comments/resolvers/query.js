import errorHandler from '../../../db/exceptions/db'
import { PostNotFound } from '../../../db/exceptions/user'
import Post from './../../../db/models/post.model'
import { handleCommentMeta } from './helpers'

export const getPostComments = async ({ pid }) => {
  // Note: This is currently useless, as we are eager loading comments from posts
  try {
    const requiredPost = await Post.query().findById(pid)
    if (!requiredPost) {
      return { ok: false, msg: PostNotFound }
    }
    const comments = await requiredPost
      .$relatedQuery('comments')
      .withGraphFetched({
        comment_author: {
          $modify: ['selectName'],
        },
      })
      .modifiers({
        selectName(builder) {
          builder.select('first_name', 'last_name', 'id')
        },
      })
      .throwIfNotFound()

    return { ok: true, comments }
  } catch (err) {
    const { type } = errorHandler(err)
    return { ok: false, msg: type }
  }
}
