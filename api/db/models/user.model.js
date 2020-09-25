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

  // CRUD Methods
  async create(userData) {
    userData.password = await argon2.hash(userData.password)
    await User.query().insert(userData)
  }

  async read(partialUser) {
    return User.query().where(partialUser)
  }

  async update(id, partialUser) {
    await User.query().findById(id).patch(partialUser)
  }

  async delete(id) {
    await User.query().deleteById(id)
  }
}

export default User
