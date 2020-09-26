import Post from '../../db/models/post.model'
import {} from 'objection'
import errorHandler from '../../db/exceptions/db'
import { Unauthorized } from '../../db/exceptions/user'

//TODO: Remove Redundant code

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
  post.author_name = `${author.first_name} ${author.last_name}`

  return post
}

export const getPostsResolver = (callback) => async (parent, args, ctx, info) => {
  const postsData = await callback(args, ctx)
  return postsData
}

// get Post by Id
export const getPostById = async (id, ctx) => {
  // authwall example
  // if (ctx.user.jwtOriginalError) {
  //   return { type: 'UNAUTHORIZED', msg: Unauthorized }
  // }
  try {
    const post = await Post.query()
      .findById(id)
      .withGraphFetched({
        post_categories: true,
        author: {
          $modify: ['selectName'],
        },
        comments: {
          comment_author: {
            $modify: ['selectName'],
          },
        },
      })
      .modifiers({
        selectName(builder) {
          builder.select('first_name', 'last_name', 'id')
        },
      })
      .throwIfNotFound()
    return { post }
  } catch (err) {
    const { type, message } = errorHandler(err)
    return { type, msg: message }
  }
}

// get all posts with arg filter

export const getPostsByFilter = async ({ category_id, user_id, pageSize, page, order }) => {
  let postsResponse = {}
  try {
    // fetch all post data
    if (!category_id && !user_id) {
      let posts = await Post.query()
        .orderByRaw(order)
        .page(page, pageSize)
        .withGraphFetched('[post_categories, author(selectName)]')
        .modifiers({
          selectName(builder) {
            builder.select('first_name', 'last_name', 'id')
          },
        })
      postsResponse = posts
    }
    // fetch category post data
    else if (category_id && !user_id) {
      let posts = await Post.query()
        .joinRelated('post_categories')
        .where('post_categories.id', category_id)
        .orderByRaw(order)
        .page(page, pageSize)
        .withGraphFetched('[post_categories, author(selectName)]')
        .modifiers({
          selectName(builder) {
            builder.select('first_name', 'last_name', 'id')
          },
        })
      postsResponse = posts
    }

    // fetch user post data
    else if (!category_id && user_id) {
      let posts = await Post.query()
        .where('author_id', user_id)
        .orderByRaw(order)
        .page(page, pageSize)
        .withGraphFetched('[post_categories, author(selectName)]')
        .modifiers({
          selectName(builder) {
            builder.select('first_name', 'last_name', 'id')
          },
        })

      postsResponse = posts
    }

    // fetch user data for a category posts
    else {
      let posts = await Post.query()
        .joinRelated('post_categories')
        .where('author.id', user_id)
        .where('post_categories.id', category_id)
        .orderByRaw(order)
        .page(page, pageSize)
        .withGraphFetched('[post_categories, author(selectName)]')
        .modifiers({
          selectName(builder) {
            builder.select('first_name', 'last_name', 'id')
          },
        })
      postsResponse = posts
    }

    const postsData = postsResponse.results.map((post) => handlePostMeta(post))
    return { posts: postsData }
  } catch (err) {
    const { type, message } = errorHandler(err)
    return { type, msg: message }
  }
}

// get Home Screen Posts
export const getPostsByType = async (type) => {
  let postsData = []
  try {
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
    return { posts: postsData }
  } catch (err) {
    const { type, message } = errorHandler(err)
    return { type, msg: message }
  }
}
