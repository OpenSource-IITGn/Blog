import React from 'react'
import { usePostByTypeQuery } from '../../graphql/queries'
import { featuredGridConfig, mergeStyles, trendingGridConfig } from '../../helpers/helpers'
import GridPost from './gridPost'

// const featuredPosts = mergeStyles(featured, featuredGridConfig)

function PostsGrid({ type, columns, ceil }) {
  const { data, error, loading } = usePostByTypeQuery({
    type: 'trending',
  })

  if (loading) {
    return <div>loading</div>
  }
  if (error) {
    return <div> Error : {error.toString()} </div>
  }

  const postsResponse = data.getPostsByType
  // implies err
  if (postsResponse.msg || postsResponse.type) {
    return (
      <div>
        {postsResponse.type} -- {postsResponse.msg}
      </div>
    )
  }

  const posts = postsResponse.posts
  const trendingPosts = mergeStyles(posts, featuredGridConfig)

  return (
    <>
      <section
        className="posts-grid"
        style={{
          gridTemplateColumns: `repeat(${columns}, minmax(300px, 1fr))`,
        }}
      >
        {trendingPosts.slice(0, posts.length - 1).map((post, index) => (
          <GridPost {...{ post, index, ceil, key: index }} />
        ))}
        {type === 'trending' && <GridPost post={trendingPosts[posts.length - 1]} />}
      </section>
    </>
  )
}

export default PostsGrid
