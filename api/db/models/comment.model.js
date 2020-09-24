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

  // CRUD Methods
  async create(commentData) {
    await Comment.query().insert(commentData)
  }

  async read(commentQuery) {
    return Comment.query().where(commentQuery)
  }

  async update(id, commentData) {
    await Comment.query().findById(id).patch(commentData)
  }

  async delete(id) {
    await Comment.query().deleteById(id)
  }
}

export default Comment
