import knex from 'knex'
import { Model } from 'objection'
import knexConfig from './../knexFile'
import dotenv from 'dotenv'

dotenv.config()
var environment = process.env.NODE_ENV || 'development'
var connection = knex(knexConfig[environment])

Model.knex(connection)
export default connection
