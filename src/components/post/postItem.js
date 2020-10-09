import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Col, Divider, Row } from 'antd'

import TagsContainer from './../tagsContainer'

function PostItem({ post }) {
  let history = useHistory()

  let postCategories = post.categories
  if (typeof post.categories === 'string') {
    postCategories = post.categories.split(' ')
  }

  const handleClick = (e) => {
    history.push(`/blog/${post.id}`)
  }

  return (
    <div className="post-item">
      <Row onClick={handleClick} style={{ cursor: 'pointer' }}>
        <Col span={17}>
          <div className="post-content">
            <h3 className="post-title">{post.title}</h3>
            <TagsContainer postCategories={postCategories} theme="dark" />
            <div className="post-author">By - {post.author}</div>
            <div className="post-date">{post.date}</div>
            <div className="post-desc">{post.description}</div>
            <div className="more-button">Read more ...</div>
          </div>
        </Col>
        <Col span={7}>
          <figure>
            {/* <Link to={post.link}> */}
            <img
              src={require(`./../../assets/images/${post.image}`)}
              className="post-item-image"
              alt={post.image}
            />
            {/* </Link> */}
          </figure>
        </Col>
      </Row>
      <Divider />
    </div>
  )
}

export default PostItem
