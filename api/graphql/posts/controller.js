import Post from '../../db/models/post.model'

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

// get Post by Id
export const getPostById = async (id) =>
  await Post.query({ id }).withGraphFetched(
    '[post_categories, comments[comment_author], author, post_likes'
  )

// get Home Screen Posts
export const getPosts = async (type, category) => {
  let postsData = []
  switch (type) {
    case 'trending':
      let posts = await Post.query()
        .orderBy('likes')
        .limit(2)
        .withGraphFetched('[post_categories, author(selectName)]')
        .modifiers({
          selectName(builder) {
            builder.select('first_name', 'last_name', 'id')
          },
        })
      postsData = posts.map((post) => handlePostMeta(post))
      break
    case 'recent':
      let recentPosts = await Post.query()
        .orderBy('created_at')
        .withGraphFetched('[post_categories, author(selectName)]')
        .modifiers({
          selectName(builder) {
            builder.select('first_name', 'last_name', 'id')
          },
        })
      postsData = recentPosts.map((post) => handlePostMeta(post))
      break
    case 'recommended':
      let rePosts = await Post.query()
        .whereIn('id', [1])
        .withGraphFetched('[post_categories, author(selectName)]')
        .modifiers({
          selectName(builder) {
            builder.select('first_name', 'last_name', 'id')
          },
        })
      postsData = rePosts.map((post) => handlePostMeta(post))
      break
    default:
      const defaultPosts = await Post.query()
        .withGraphFetched('[post_categories, author(selectName)]')
        .modifiers({
          selectName(builder) {
            builder.select('first_name', 'last_name', 'id')
          },
        })
      postsData = defaultPosts.map((post) => handlePostMeta(post))
      break
  }
  return postsData
}
