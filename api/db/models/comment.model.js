import { Model } from 'objection'

class Comment extends Model {
  static get tableName() {
    return 'comments'
  }

  static get relationMappings() {
    const { Post } = require('./post.model')
    const { User } = require('./user.model')

    return {
      comment_author: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'comments.author_id',
          to: 'users.id',
        },
      },
      comment_post: {
        relation: Model.BelongsToOneRelation,
        modelClass: Post,
        join: {
          from: 'comments.post_id',
          to: 'posts.id',
        },
      },
    }
  }
}

export default Comment
