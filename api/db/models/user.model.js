import { Model } from 'objection'
import connection from '../connection'

class User extends Model {
  static get tableName() {
    return 'users'
  }
}

export default User
