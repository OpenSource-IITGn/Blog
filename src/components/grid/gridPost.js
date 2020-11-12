import dayjs from 'dayjs'
import React from 'react'
import TagsContainer from '../tagsContainer'

function GridPost({ post, ceil }) {
  // window width
  const windowWidth = window.innerWidth
  const bgStyle = {
    backgroundImage: `url("${post.img_url}" )`,
  }

  const postStyles = windowWidth > 900 ? { ...post.style } : {}

  const styles = ceil ? { ...postStyles, justifyContent: 'space-between' } : { ...postStyles }

  const containerStyle = ceil ? { justifyContent: 'space-between' } : {}

  // const postCategories = post.categories.split(' ')
  // console.log(post.categories)

  const formattedDate = dayjs(post.created_at).format('MMMM DD, YYYY')

  return (
    <div className="grid-post overlay" style={styles} href={post.link}>
      <div className="bg-blog-image" style={bgStyle}></div>
      <div className="grid-post-container" style={containerStyle}>
        {/* <TagsContainer postCategories={postCategories} /> */}
        <div className="image-text">
          <h3 className="image-title">{post.title}</h3>
          <span className="image-date">{formattedDate}</span>
        </div>
      </div>
    </div>
  )
}

export default GridPost
