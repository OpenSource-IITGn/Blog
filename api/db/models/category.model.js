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
    // CRUD Methods
    async create(categoryData) {
      await Category.query().insert(categoryData)
    }
  
    async read(categoryQuery) {
      return Category.query().where(categoryQuery)
    }
  
    async update(id, categoryData) {
      await Category.query().findById(id).patch(categoryData)
    }
  
    async delete(id) {
      await Category.query().deleteById(id)
    }
  
}

export default Category
