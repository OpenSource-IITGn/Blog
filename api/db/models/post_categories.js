import { Model } from 'objection'

export class PostCategories extends Model {
  static get tableName() {
    return 'post_categories'
  }

  static get relationMappings() {
    return {
      post: {
        relation: Model.BelongsToOneRelation,
        modelClass: __dirname + './post.model',
        join: {
          from: 'post_categories.post_id',
          to: 'posts.id',
        },
      },
      category: {
        relation: Model.BelongsToOneRelation,
        modelClass: __dirname + './category.model',

        join: {
          from: 'post_categories.category_id',
          to: 'categories.id',
        },
      },
    }
  }
}

export default PostCategories
