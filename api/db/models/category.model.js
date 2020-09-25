import { Model } from 'objection'

class Category extends Model {
  static get tableName() {
    return 'categories'
  }

  static get relationMappings() {
    const { Post } = require('./post.model')

    return {
      category_posts: {
        relation: Model.ManyToManyRelation,
        modelClass: Post,
        join: {
          from: 'categories.id',
          through: {
            to: 'post_categories.post_id',
            from: 'post_categories.category_id',
          },
          to: 'posts.id',
        },
      },
    }
  }
}

export default Category
