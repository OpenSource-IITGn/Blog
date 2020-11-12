const argon2 = require('argon2')
const blog1 = require('../../mockBlogs/1')
const blog2 = require('../../mockBlogs/2')
const blog3 = require('../../mockBlogs/3')
const blog4 = require('../../mockBlogs/4')
const blog5 = require('../../mockBlogs/5')
const blog6 = require('../../mockBlogs/6')
const blog7 = require('../../mockBlogs/7')
const blog8 = require('../../mockBlogs/8')
const blog9 = require('../../mockBlogs/9')
const blog10 = require('../../mockBlogs/10')
const blog11 = require('../../mockBlogs/11')
const { blog } = require('../../mockBlogs/11')

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
    email: 'anup.aglawe@iitgn.ac.in',
    password: await argon2.hash('anup.aglawe'),
    role_id: 1,
  }

  const user2 = {
    first_name: 'Aditya',
    last_name: 'Natu',
    email: 'natu_aditya@iitgn.ac.in',
    password: await argon2.hash('aditya.natu'),
    role_id: 1,
  }

  const user3 = {
    first_name: 'Tejan ',
    last_name: 'Chaudhary ',
    email: 'tejanc@iitgn.ac.in',
    password: await argon2.hash('tejan.chaudhary'),
    role_id: 1,
  }

  const user4 = {
    first_name: 'Sahit ',
    last_name: 'Jayakrishna',
    email: 'sahit.jayakrishna@iitgn.ac.in',
    password: await argon2.hash('sahit.jayakrishna'),
    role_id: 1,
  }

  const user5 = {
    first_name: 'Ganesh',
    last_name: 'S',
    email: 'ganesh.s@iitgn.ac.in',
    password: await argon2.hash('ganesh.s'),
    role_id: 1,
  }

  const user6 = {
    first_name: 'Amitha',
    last_name: 'Rani',
    email: 'amitha.rani@iitgn.ac.in',
    password: await argon2.hash('amitha.rani'),
    role_id: 1,
  }

  const user7 = {
    first_name: 'Manas ',
    last_name: 'Bedmutha',
    email: 'manas.bedmutha@iitgn.ac.in',
    password: await argon2.hash('manas.bedmutha'),
    role_id: 1,
  }
  const user8 = {
    first_name: 'Arpita',
    last_name: 'Kabra',
    email: 'arpita.kabra@iitgn.ac.in',
    password: await argon2.hash('aditya.natu'),
    role_id: 1,
  }

  const user9 = {
    first_name: 'Torque',
    last_name: 'Official',
    email: 'torque@iitgn.ac.in',
    password: await argon2.hash('torque.official'),
    role_id: 1,
  }

  const post1 = {
    title: 'Creating Cattle: The courage of our ancestors',
    author_id: 2,
    img_url:
      'https://www.muralswallpaper.com/app/uploads/Abstract-Rainbow-Wallpaper-Mural-Swatch.jpg',
    description:
      'Long ago, when we didn’t have agriculture, we searched for food in forests. That would mean gathering roots, fruits, some seeds, or hunting animals. But food is not always so easy to get; fruits, for example, are seasonal. While killing wild goats gave us meat to eat and skin to use, keeping some of them alive was even more useful.',
    body: blog1.blog,
  }
  const post2 = {
    title: 'Quantum Computing : Imagining the unimaginable.',
    author_id: 3,
    img_url: 'https://slidesgo.com/storage/90299/conversions/0-abstract-cv-thumb.jpg',
    description:
      'Imagine if I were to tell you that in a future not so distant from us, the world’s fastest supercomputer, the Japanese Fugaku would be reduced to a piece of junk as a new set of machines rise from the laboratories of Google and IBM, you would probably laugh in my face.',
    body: blog2.blog,
  }

  const post3 = {
    title: 'The future of the human brain — A review',
    author_id: 4,
    img_url: 'https://petapixel.com/assets/uploads/2020/04/abstract_1-800x534.jpg',

    description:
      'The human brain is a fascinating organ and there is no area unlike the field of Computer Science which is more inspired by it. The entire field of Artificial Intelligence having been built around the concept that one day we will be able to teach machines to be able to teach themselves to think and make decisions like humans.',
    body: blog1.blog,
  }

  const post4 = {
    title: 'The impact of Human Augmentation on society',
    author_id: 5,
    img_url: 'https://i.pinimg.com/originals/ec/f3/61/ecf361a14d789dabd901ecb970ff2fc0.jpg',

    description:
      'The human race, ever since it has come into existence, has been a part of an evolutionary process steadily through natural means. Groundbreaking inventions of humans over the last two centuries have made it possible to increase efficiency and comfort in doing numerous tasks.',
    body: blog2.blog,
  }

  const post5 = {
    title: 'Genetic Fortune Telling?',
    author_id: 6,
    img_url:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS-kXG93u-zthcYbjIOQJcRuPqWfSMBS-HmkQ&usqp=CAU',

    description:
      'Is it that day yet? The day you question all your choices, wishing you had done things differently? Is it that day when you wonder how things would’ve been different if you only had a hint as to where your skills lie? ',
    body: blog1.blog,
  }

  const post6 = {
    title: 'Exploring the blockchain technology beyond Cryptocurrencies',
    author_id: 7,
    img_url:
      'https://png.pngtree.com/thumb_back/fw800/background/20190828/pngtree-dark-vector-abstract-background-image_302715.jpg',

    description:
      'Blockchain has been on every tongue ever since the Bitcoin boom a year back. The buzz has been on the rise since then. People buy, sell or “hodl” (a common blockchain slang for holding) these coins or so-called cryptocurrencies.',
    body: blog2.blog,
  }

  const post7 = {
    title: 'The Science of Laziness: Fault in our Genes',
    author_id: 8,
    img_url: 'https://www.7pace.com/wp-content/uploads/2020/08/cover-abstract-thinking.png',

    description:
      'Mumma says, “ Get up and do something”, and here we get a long list of errands to run for. Gathering all the courage left after hearing these ruthless words, we put all efforts to come out of the comfort of that cozy bed.',
    body: blog10.blog,
  }

  const post8 = {
    title: 'Fiction To Reality',
    author_id: 9,
    img_url:
      'https://images.unsplash.com/photo-1541701494587-cb58502866ab?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',

    description:
      'Remember the glass elevator in the movie Charlie and the chocolate factory. The elevator that Mr. Willy Wonka used to move throughout his factory. ',
    body: blog11.blog,
  }

  const post9 = {
    title: '🎈SVGWave🌊 - A miniproject - courtesy of hacktoberfest',
    author_id: 1,
    img_url:
      'https://img.freepik.com/free-photo/abstract-background-colorful-spin-circle_73152-3318.jpg?size=626&ext=jpg',

    description:
      '✨As I mark the completion of hacktoberfest, I would say that the one thing which helped me cross the barrier to enter the world of open source, is hacktoberfest.',
    body: blog10.blog,
  }

  const post10 = {
    title: 'Beautify your Windows Terminal 🦄 ',
    author_id: 1,
    img_url:
      'https://www.marshallsindia.com/images/bs-collection/volume2/abstract/abstract-slider-1.jpg',

    description:
      'Remember the glass elevator in the movie Charlie and the chocolate factory. The elevator that Mr. Willy Wonka used to move throughout his factory. ',
    body: blog10.blog,
  }

  const post11 = {
    title: 'Balancing the Imbalanced Data',
    author_id: 1,
    img_url:
      'https://images.ctfassets.net/hrltx12pl8hq/37lqQySBsACiSCc4i4oCue/4149c19142eee853780c0d650566227f/shutterstock_574261726_thumb.jpg?fit=fill&w=368&h=207',

    description:
      'Imbalanced data has been a thorn in Machine Learning researchers’ side for a very long time and academicians have worked hard to solve these problems. Real-world datasets always have some degree of imbalance.',
    body: blog11.blog,
  }

  // const post_categories1 = { post_id: 1, category_id: 1 }
  // const post_categories2 = { post_id: 2, category_id: 2 }

  // const post_likes1 = { post_id: 1, user_id: 1 }
  // const post_likes3 = { post_id: 1, user_id: 2 }
  // const post_likes2 = { post_id: 2, user_id: 2 }

  await knex(TableNames.roles).insert(role)

  await knex(TableNames.permissions).insert([permission1, permission2])

  await knex(TableNames.categories).insert([category1, category2])

  await knex(TableNames.users).insert([
    user1,
    user2,
    user3,
    user4,
    user5,
    user6,
    user7,
    user8,
    user9,
  ])

  await knex(TableNames.posts).insert([
    post1,
    post2,
    post3,
    post4,
    post5,
    post6,
    post7,
    post8,
    post9,
    post10,
    post11,
  ])

  // await knex(TableNames.comments).insert([comment1, comment2])

  await knex(TableNames.role_permissions).insert([role_permission1, role_permission2])

  // await knex(TableNames.post_categories).insert([post_categories1, post_categories2])

  // await knex(TableNames.post_likes).insert([post_likes1, post_likes2, post_likes3])
}
