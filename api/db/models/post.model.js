import { Model } from 'objection'

class Post extends Model {
  static get tableName() {
    return 'posts'
  }

  static get relationMappings() {
    const { User } = require('./user.model')
    const { Comment } = require('./comment.model')
    const { Category } = require('./category.model')

    return {
      author: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'posts.author_id',
          to: 'user.id',
        },
      },
      post_likes: {
        relation: Model.ManyToManyRelation,
        modelClass: User,
        join: {
          from: 'posts.id',
          through: {
            from: 'post_likes.post_id',
            to: 'post_likes.user_id',
          },
          to: 'users.id',
        },
      },
      comments: {
        relation: Model.HasManyRelation,
        modelClass: Comment,
        join: {
          from: 'posts.id',
          to: 'comments.post_id',
        },
      },
      post_categories: {
        relation: Model.ManyToManyRelation,
        modelClass: Category,
        join: {
          from: 'posts.id',
          through: {
            from: 'post_categories.post_id',
            to: 'post_categories.category_id',
          },
          to: 'categories.id',
        },
      },
    }
  }
}

export default Post
