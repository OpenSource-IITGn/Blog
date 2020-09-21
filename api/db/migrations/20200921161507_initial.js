const Knex = require('knex')
const { TableNames } = require('../constants')

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  await knex.schema
    .createTable(TableNames.users, (table) => {
      table.increments().notNullable()
      table.integer('role_id').notNullable()
      table.string('email', 255).notNullable().unique().index('uemail')
      table.string('first_name', 100).notNullable()
      table.string('last_name', 100)
      table.string('image_url', 2000)
      table.timestamps()
    })
    .createTable(TableNames.roles, (table) => {
      table.increments().notNullable()
      table.string('role', 30).notNullable()
    })
    .createTable(TableNames.permissions, (table) => {
      table.increments().notNullable()
      table.string('action', 30).notNullable()
    })
    .createTable(TableNames.categories, (table) => {
      table.increments().notNullable()
      table.string('label', 100).notNullable()
      table.string('description', 300)
    })
    .createTable(TableNames.posts, (table) => {
      table.increments().notNullable()
      table.integer('author_id').notNullable().index('blog_author')
      table.string('title', 300).notNullable()
      table.text('body').notNullable()
      table.string('keyword', 50).notNullable()
      table.string('img_url', 2000)
      table.string('cover_url', 2000).notNullable()
      table.string('cover_type').notNullable()
      table.timestamps()
    })
    .createTable(TableNames.comments, (table) => {
      table.increments().notNullable()
      table.integer('post_id').notNullable().index()
      table.integer('author_id').notNullable().index()
      table.string('body').notNullable()
    })
}

/**
 * @param {Knex} knex
 */
exports.down = async (knex) => {
  await Promise.all(Object.values(TableNames).map((tableName) => knex.schema.dropTable(tableName)))
}
