import React from 'react'
import { Col, Divider, Row } from 'antd'

import trending from '../assets/mocks/trending'
import Post from '../components/post/Post'
import PostsGrid from '../components/grid/PostsGrid'
import { mergeStyles, trendingGridConfig } from '../helpers/helpers'

const trendingPosts = mergeStyles(trending, trendingGridConfig)

function BlogDetail() {
  return (
    <main className="home">
      <section className="container">
        <div className="row">
          <Row justify="center">
            <Col lg={16} md={24}>
              <Post />
            </Col>
          </Row>
        </div>
      </section>
      <Divider />
      <section className="container">
        <div className="row">
          <h2 className="section-heading">Recommended Posts</h2>
          <PostsGrid posts={trendingPosts} columns={3} />
        </div>
      </section>
    </main>
  )
}

export default BlogDetail
