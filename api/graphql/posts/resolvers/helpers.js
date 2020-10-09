export const handlePostMeta = (post) => {
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
  post.author_name = `${author.first_name} ${author.last_name}`

  return post
}
