import { Model } from 'objection'

class Role extends Model {
  static get tableName() {
    return 'roles'
  }

  static get relationMappings() {
    const { Permission } = require('./permission.model')

    return {
      role_actions: {
        relation: Model.ManyToManyRelation,
        modelClass: Permission,
        join: {
          from: 'roles.id',
          through: {
            from: 'role_permissions.role_id',
            to: 'role_permissions.permssion_id',
          },
          to: 'permissions.id',
        },
      },
    }
  }
}

export default Role
