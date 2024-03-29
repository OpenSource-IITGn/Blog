import { Model } from 'objection'

class Post extends Model {
  static get tableName() {
    return 'posts'
  }

  static get modelPaths() {
    return [__dirname]
  }

  static get relationMappings() {
    return {
      author: {
        relation: Model.BelongsToOneRelation,
        modelClass: __dirname + '/user.model',
        join: {
          from: 'posts.author_id',
          to: 'users.id',
        },
      },
      post_likes: {
        relation: Model.ManyToManyRelation,
        modelClass: __dirname + '/user.model',
        join: {
          from: 'posts.id',
          through: {
            modelClass: __dirname + '/post_likes.model',
            from: 'post_likes.post_id',
            to: 'post_likes.user_id',
          },
          to: 'users.id',
        },
      },
      comments: {
        relation: Model.HasManyRelation,
        modelClass: __dirname + '/comment.model',
        join: {
          from: 'posts.id',
          to: 'comments.post_id',
        },
      },
      post_categories: {
        relation: Model.ManyToManyRelation,
        modelClass: __dirname + '/category.model',
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
