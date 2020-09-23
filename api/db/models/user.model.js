import { Model } from 'objection'

class User extends Model {
  static get tableName() {
    return 'users'
  }

  static get relationMappings() {
    const { Role } = require('./role.model')
    const { Post } = require('./post.model')
    const { Comment } = require('./comment.model')
    const { PostLike } = require('./post_likes.model')

    return {
      role: {
        relation: Model.BelongsToOneRelation,
        modelClass: Role,
        join: {
          from: 'users.role_id',
          to: 'roles.id',
        },
      },
      posts: {
        relation: Model.HasManyRelation,
        modelClass: Post,
        join: {
          from: 'users.id',
          to: 'posts.author_id',
        },
      },
      comments: {
        relation: Model.HasManyRelation,
        modelClass: Comment,
        join: {
          from: 'users.id',
          to: 'comments.author_id',
        },
      },
      reactions: {
        relation: Model.HasManyRelation,
        modelClass: PostLike,
        join: {
          from: 'users.id',
          to: 'post_likes.user_id',
        },
      },
    }
  }
}

export default User
