// get Post by Id
import Post from './../../../db/models/post.model'
import errorHandler from './../../../db/exceptions/db'
import { handlePostMeta } from './helpers'

export const getPostById = async (id) => {
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
    post.image = '1.jpg'
    post.created_at = post.created_at.toString()
    return { post }
  } catch (err) {
    const { type, message } = errorHandler(err)
    return { type, msg: message }
  }
}

// GET POSTS BY FILTERS
export const getPostsByFilter = async ({
  search_query,
  category_id,
  user_id,
  pageSize,
  page,
  order,
}) => {
  let posts = Post.query()
  let postsList = []

  if (search_query) {
    posts.whereRaw('SIMILARITY(title, ?) > 0.7', search_query)
  }
  const postCount = await posts.clone().count()

  try {
    // fetch all post data
    if (!category_id && !user_id) {
      postsList = await posts
        .orderByRaw(order)
        .page(page, pageSize)
        .withGraphFetched('[post_categories, author(selectName)]')
        .modifiers({
          selectName(builder) {
            builder.select('first_name', 'last_name', 'id')
          },
        })
      // console.log(posts.toKnexQuery().toSQL().toNative())
    }
    // fetch category post data
    else if (category_id && !user_id) {
      postsList = await posts
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
    }

    // fetch user post data
    else if (!category_id && user_id) {
      postsList = await posts
        .where('author_id', user_id)
        .orderByRaw(order)
        .page(page, pageSize)
        .withGraphFetched('[post_categories, author(selectName)]')
        .modifiers({
          selectName(builder) {
            builder.select('first_name', 'last_name', 'id')
          },
        })
    }

    // fetch user data for a category posts
    else {
      postsList = await posts
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
    }
    const postsData = postsList.results.map((post) => handlePostMeta(post))
    return { posts: postsData, total: postCount[0].count }
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
