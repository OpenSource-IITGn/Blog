import Post from './../../db/models/post.model'

const handlePostMeta = (post) => {
  const CategoryArray = post.post_categories
  const author = post.author
  // set categories from object
  if (!CategoryArray) {
    post.categories = []
  } else {
    const allLabels = CategoryArray.map((category) => category.label)
    post.categories = allLabels
  }

  // set author name from Id
  post.author = `${author.first_name} ${author.last_name}`

  return post
}

export const getPostsResolver = (callback) => async (parent, args, ctx, info) => {
  const postsData = await callback(args)
  return postsData
}

export const getPosts = async (type, category) => {
  let postsData = []
  switch (type) {
    case 'trending':
      const posts = await Post.query()
        .withGraphFetched('[post_categories, author(selectName)]')
        .modifiers({
          selectName(builder) {
            builder.select('first_name', 'last_name', 'id')
          },
        })
      postsData = posts.map((post) => handlePostMeta(post))
      break
    case 'recent':
      break
    case 'recommended':
      break
    default:
      const defaultPosts = await Post.query().withGraphFetched(
        '[post_categories, author, post_likes]'
      )
      postsData = defaultPosts.map((post) => handlePostMeta(post))
      break
  }
  return postsData
}
