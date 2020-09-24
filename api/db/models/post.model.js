import { Model } from 'objection'

class Post extends Model {
  static get tableName() {
    return 'posts'
  }
  static get modelPaths() {
    return [__dirname]
  }

  static get relationMappings() {
    // const { User } = require('./user.model')
    const { Comment } = require('./comment.model')
    // const { Category } = require('./category.model')

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

  // CRUD Methods
  async create(postData) {
    await Post.query().insert(postData)
  }

  async read(postQuery) {
    return Post.query().where(postQuery)
  }

  async update(id, postData) {
    await Post.query().findById(id).patch(postData)
  }

  async delete(id) {
    await Post.query().deleteById(id)
  }
}

export default Post
