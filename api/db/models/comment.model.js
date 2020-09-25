import { Model } from 'objection'

class Comment extends Model {
  static get tableName() {
    return 'comments'
  }

  static get relationMappings() {
    return {
      comment_author: {
        relation: Model.BelongsToOneRelation,
        modelClass: __dirname + '/user.model',
        join: {
          from: 'comments.author_id',
          to: 'users.id',
        },
      },
      comment_post: {
        relation: Model.BelongsToOneRelation,
        modelClass: __dirname + '/post.model',
        join: {
          from: 'comments.post_id',
          to: 'posts.id',
        },
      },
    }
  }
}

export default Comment
