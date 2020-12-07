// get Post by Id
import Post from './../../../db/models/post.model'
import errorHandler from './../../../db/exceptions/db'
import { handlePostMeta } from './helpers'
import { handleCommentMeta } from './../../comments/resolvers/helpers'
import PostLike from '../../../db/models/post_likes.model'

export const getPostById = async (id, ctx) => {
  let userId = null
  if (ctx.user && ctx.user.user && !ctx.user.jwtOriginalError) {
    const userContext = ctx.user
    userId = userContext.user.id
  }

  try {
    const post = await Post.query()
      .findById(id)
      .withGraphFetched({
        post_categories: true,
        author: {
          $modify: ['selectAuthor'],
        },
        post_likes: {
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
        selectAuthor(builder) {
          builder.select('first_name', 'last_name', 'id', 'bio', 'image_url')
        },
      })
      .throwIfNotFound()

    if (userId) {
      const currentLike = await PostLike.query().where('post_id', id).where('user_id', userId)
      if (currentLike && currentLike.length !== 0) {
        post.current_like = true
      } else {
        post.current_like = false
      }
    }

    post.created_at = post.created_at.toString()
    post.likes = post.post_likes.length
    post.comments = post.comments ? post.comments.map((c) => handleCommentMeta(c)) : null

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
        .withGraphFetched('[post_categories, author(selectName), post_likes(selectName)]')
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
        .withGraphFetched('[post_categories, author(selectName), post_likes(selectName)]')
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
        .withGraphFetched('[post_categories ,author(selectName), post_likes(selectName)]')
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
        .withGraphFetched('[post_categories, author(selectName), post_likes(selectName)]')
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
          .orderBy('likes', 'desc')
          .limit(5)
          .withGraphFetched('[post_categories, author(selectName), post_likes(selectName)]')
          .modifiers({
            selectName(builder) {
              builder.select('first_name', 'last_name', 'id')
            },
          })
        // console.log(posts)
        // console.log(posts.toKnexQuery().toSQL().toNative())

        // postCount = await posts.clone().count()
        postsData = posts.map((post) => handlePostMeta(post))
        break

      case 'recent':
        let recentPosts = await Post.query()
          .orderBy('created_at')
          .withGraphFetched('[post_categories, author(selectName), post_likes(selectName)]')
          .modifiers({
            selectName(builder) {
              builder.select('first_name', 'last_name', 'id')
            },
          })
        postsData = recentPosts.map((post) => handlePostMeta(post))
        break

      case 'recommended':
        let rePosts = await Post.query()
          .whereIn('id', [5, 6, 7, 8, 9, 10])
          .withGraphFetched('[post_categories, author(selectName), post_likes(selectName)]')
          .modifiers({
            selectName(builder) {
              builder.select('first_name', 'last_name', 'id')
            },
          })
        postsData = rePosts.map((post) => handlePostMeta(post))
        break

      default:
        const defaultPosts = await Post.query()
          .withGraphFetched('[post_categories, author(selectName), post_likes(selectName)]')
          .modifiers({
            selectName(builder) {
              builder.select('first_name', 'last_name', 'id')
            },
          })
        postsData = defaultPosts.map((post) => handlePostMeta(post))
        break
    }

    // console.log(postsData, postCount)
    return { posts: postsData }
  } catch (err) {
    console.log(err)
    const { type, message } = errorHandler(err)
    return { type, msg: message }
  }
}
