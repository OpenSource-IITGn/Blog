import { Model } from 'objection'

export class PostLike extends Model {
  static get tableName() {
    return 'post_likes'
  }

  static relationMappings = () => {
    const { Post } = require('./post.model')
    const { User } = require('./user.model')

    return {
      post: {
        relation: Model.BelongsToOneRelation,
        modelClass: Post,
        join: {
          from: 'post_likes.post_id',
          to: 'posts.id',
        },
      },
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'post_likes.user_id',
          to: 'users.id',
        },
      },
    }
  }
}

export default PostLike
