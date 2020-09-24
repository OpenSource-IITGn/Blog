import Post from './../../db/models/post.model'

const handlePostMeta = (post) => {
  const CategoryArray = post.post_categories
  const author = post.author

  if (!CategoryArray) {
    post.categories = []
  } else {
    const allLabels = CategoryArray.map((category) => category.label)
    post.categories = allLabels
  }
  post.author = `${author.first_name} ${author.last_name}`
  return post
}

export const getPostsResolver = (callback) => async (parent, args, ctx, info) => {
  const postsData = await callback(args)
  return postsData
}

export const getPosts = async (type, category) => {
  const posts = await Post.query().withGraphFetched('author').withGraphFetched('post_categories')
  console.log(posts)
  const posts_cats = posts.map((post) => handlePostMeta(post))
  return posts_cats
}
