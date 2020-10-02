import { Col, Divider, Row } from 'antd'
import React from 'react'
import trending from '../assets/mocks/trending'
import Post from '../components/Post'
import PostsGrid from '../components/PostsGrid'

const trendingGridConfig = {
  1: {
    gridArea: '1 / 2 / 3 / 3',
  },
}

const mergeStyles = (posts, config) => {
  posts.forEach((post, index) => {
    post.style = config[index]
    post.author = 'Anup Aglawe'
    post.description =
      'Quis incididunt tempor mollit sunt incididunt non. Commodo i sunt consequat ullamco occaecat labore duis culpa occaecat pariatur consectetur qui cupidatat esse. Enim commodo sint adipisicing irure.'
  })
}

mergeStyles(trending, trendingGridConfig)

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
          <PostsGrid posts={trending} columns={3} />
        </div>
      </section>
    </main>
  )
}

export default BlogDetail
