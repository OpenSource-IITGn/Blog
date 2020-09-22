import { Model } from 'objection'

class Permission extends Model {
  static get tableName() {
    return 'permissions'
  }

  //   static get relationMappings() {
  //     const { Role } = require('./role.model')

  //     return {
  //       permission_roles: {
  //         relation: Model.ManyToManyRelation,
  //         modelClass: Role,
  //         join: {
  //           from: 'permissions.id',
  //           through: {
  //             to: 'role_permissions.role_id',
  //             from: 'role_permissions.permssion_id',
  //           },
  //           to: 'roles.id',
  //         },
  //       },
  //     }
  //   }
}

export default Permission
