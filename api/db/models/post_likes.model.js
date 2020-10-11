import { Model } from 'objection'

export class PostLike extends Model {
  static get tableName() {
    return 'post_likes'
  }

  static get idColumn() {
    return ['post_id', 'user_id']
  }

  static get relationMappings() {
    return {
      post: {
        relation: Model.BelongsToOneRelation,
        modelClass: __dirname + './post.model',
        join: {
          from: 'post_likes.post_id',
          to: 'posts.id',
        },
      },
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: __dirname + './user.model',

        join: {
          from: 'post_likes.user_id',
          to: 'users.id',
        },
      },
    }
  }
}

export default PostLike
