const argon2 = require('argon2')
const TableNames = require('./../../constants').TableNames

exports.seed = async (knex) => {
  // Deletes ALL existing entries
  await knex(TableNames.role_permissions).del()
  await knex(TableNames.permissions).del()
  await knex(TableNames.post_categories).del()
  await knex(TableNames.post_likes).del()
  await knex(TableNames.comments).del()
  await knex(TableNames.categories).del()
  await knex(TableNames.posts).del()
  await knex(TableNames.users).del()
  await knex(TableNames.roles).del()

  // Inserts seed entries
  const role = {
    role: 'admin',
  }

  const permission1 = {
    action: 'edit',
  }

  const permission2 = {
    action: 'view',
  }

  const role_permission1 = {
    role_id: 1,
    permission_id: 1,
  }

  const role_permission2 = {
    role_id: 1,
    permission_id: 2,
  }

  const category1 = {
    label: 'First',
    description: 'First description',
  }

  const category2 = {
    label: 'Second',
    description: 'Second description',
  }

  const user1 = {
    first_name: 'Anup',
    last_name: 'Aglawe',
    email: 'asd@asd.co',
    password: await argon2.hash('password'),
    role_id: 1,
  }

  const user2 = {
    first_name: 'Anup2',
    last_name: 'Aglawe',
    email: 'asd2@asd.co',
    password: await argon2.hash('password'),
    role_id: 1,
  }

  const post1 = {
    title: 'Title 1',
    author_id: 1,
    body:
      '{"blocks":[{"key":"dr627","text":"dfgdfg dfg dfg dfg dfg","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":19,"length":3,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}',
    keyword: 'blog',
    likes: '3',
  }
  const post2 = {
    title: 'Title 2',
    author_id: 2,
    body:
      '{"blocks":[{"key":"dr627","text":"dfgdfg dfg dfg dfg dfg","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":19,"length":3,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}',
    keyword: 'blog',
    likes: '4',
  }

  const post3 = {
    title: 'Title 3',
    author_id: 2,
    body:
      'asd asd asd asd asdsdgdf gdfg dfg dfg df jghfj ghj ghj ghj ghj ghj ghj ghj ghj ghj ghj ghj ghj ghj ',
    keyword: 'blog',
    likes: '2',
  }

  const post4 = {
    title: 'Title 4',
    author_id: 2,
    body:
      'asd asd asd asd asdsdgdf gdfg dfg dfg df jghfj ghj ghj ghj ghj ghj ghj ghj ghj ghj ghj ghj ghj ghj ',
    keyword: 'blog',
    likes: '1',
  }

  const comment1 = { post_id: 1, author_id: 1, body: 'commrnt 1' }
  const comment2 = { post_id: 1, author_id: 2, body: 'commrnt 2' }

  const post_categories1 = { post_id: 1, category_id: 1 }
  const post_categories2 = { post_id: 2, category_id: 2 }

  const post_likes1 = { post_id: 1, user_id: 1 }
  const post_likes3 = { post_id: 1, user_id: 2 }
  const post_likes2 = { post_id: 2, user_id: 2 }

  await knex(TableNames.roles).insert(role)

  await knex(TableNames.permissions).insert([permission1, permission2])

  await knex(TableNames.categories).insert([category1, category2])

  await knex(TableNames.users).insert([user1, user2])

  await knex(TableNames.posts).insert([post1, post2, post3, post4])

  await knex(TableNames.comments).insert([comment1, comment2])

  await knex(TableNames.role_permissions).insert([role_permission1, role_permission2])

  await knex(TableNames.post_categories).insert([post_categories1, post_categories2])

  await knex(TableNames.post_likes).insert([post_likes1, post_likes2, post_likes3])
}
