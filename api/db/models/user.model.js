import { Model } from 'objection'

class User extends Model {
  static get tableName() {
    return 'users'
  }

  static get relationMappings() {
    const { Role } = require('./role.model')

    return {
      role: {
        relation: Model.BelongsToOneRelation,
        modelClass: Role,
        join: {
          from: 'users.role_id',
          to: 'roles.id',
        },
      },
    }
  }
}

export default User
