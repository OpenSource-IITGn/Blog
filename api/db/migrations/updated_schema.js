const { Table } = require('antd')
const Knex = require('knex')
const { TableNames } = require('../constants')

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  await knex.schema

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

    .createTable(TableNames.users, (table) => {
      table.increments().notNullable().primary()
      table
        .integer('role_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('roles')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')

      table.string('email', 255).notNullable().unique().index('uemail')
      table.string('password', 100).notNullable()
      table.string('first_name', 100).notNullable()
      table.string('last_name', 100)
      table.string('image_url', 2000)
      table.timestamps(false, true)
    })

    .createTable(TableNames.posts, (table) => {
      table.increments().notNullable()
      table
        .integer('author_id')
        .notNullable()
        .index('blog_author')
        .unsigned()
        .references('id')
        .inTable('users')
        .withKeyName('fk_post_author')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')

      table.string('title', 300).notNullable()
      table.text('body').notNullable()
      table.string('keyword', 50).notNullable()
      table.string('img_url', 2000)
      table.string('cover_url', 2000)
      table.string('cover_type')
      table.string('likes').defaultTo('0')
      table.boolean('draft').defaultTo(true)
      table.timestamps(false, true)
    })
    .createTable(TableNames.comments, (table) => {
      table.increments().notNullable()
      table
        .integer('post_id')
        .notNullable()
        .index('comment_post')
        .unsigned()
        .references('id')
        .inTable(TableNames.posts)
        .withKeyName('fk_comment_post')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')

      table
        .integer('author_id')
        .notNullable()
        .index('comment_author')
        .unsigned()
        .references('id')
        .inTable(TableNames.users)
        .withKeyName('fk_comment_author')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')

      table.string('body').notNullable()
      table.timestamps(false, true)
    })

    .createTable(TableNames.role_permissions, (table) => {
      table
        .integer('role_id')
        .unsigned()
        .references('id')
        .inTable(TableNames.roles)
        .withKeyName('fk_per_roles')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')

      table
        .integer('permission_id')
        .unsigned()
        .references('id')
        .inTable(TableNames.permissions)
        .withKeyName('fk_roles_pers')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')

      table.unique(['role_id', 'permission_id'])
    })
    .createTable(TableNames.post_categories, (table) => {
      table
        .integer('post_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable(TableNames.posts)
        .withKeyName('fk_categories_post')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')

      table
        .integer('category_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable(TableNames.categories)
        .withKeyName('fk_post_categories')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')

      table.unique(['post_id', 'category_id'])
    })
    .createTable(TableNames.post_likes, (table) => {
      table
        .integer('post_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable(TableNames.posts)
        .withKeyName('fk_like_post')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')

      table
        .integer('user_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable(TableNames.users)
        .withKeyName('fk_like_user')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')

      table.unique(['post_id', 'user_id'])
    })
}

/**
 * @param {Knex} knex
 */
exports.down = async (knex) => {
  await knex.schema.dropTable(TableNames.role_permissions)
  await knex.schema.dropTable(TableNames.permissions)
  await knex.schema.dropTable(TableNames.post_categories)
  await knex.schema.dropTable(TableNames.post_likes)
  await knex.schema.dropTable(TableNames.comments)
  await knex.schema.dropTable(TableNames.categories)
  await knex.schema.dropTable(TableNames.posts)
  await knex.schema.dropTable(TableNames.users)
  await knex.schema.dropTable(TableNames.roles)
}
