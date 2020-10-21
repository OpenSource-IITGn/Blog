export const handlePostMeta = (post) => {
  const CategoryArray = post.post_categories
  const author = post.author
  const postLikes = post.post_likes
 
  // stringify date
  post.created_at = post.created_at.toString()
 
  // set categories from object
  if (!CategoryArray) {
    post.categories = []
  } else {
    const allLabels = CategoryArray.map((category) => category.label)
    post.categories = allLabels
  }

  // set author name from Id
  post.author_name = `${author.first_name} ${author.last_name}`

  // set likes for post
  post.likes = postLikes.length
  return post
}
