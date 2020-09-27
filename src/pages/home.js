import React from 'react'
import PostsGrid from '../components/PostsGrid'
import trending from './../assets/mocks/trending'
import featured from './../assets/mocks/featured'
import GridPost from '../components/gridPost'
import PostsList from '../components/postsList'
import { Col, Row } from 'antd'
import SideBar from '../components/sideBar'

const trendingGridConfig = {
  1: {
    gridArea: '1 / 2 / 3 / 3',
  },
}

const featuredGridConfig = {
  0: {
    gridArea: '1 / 1 / 2 / 3',
    height: '300px',
  },
  1: {
    height: '300px',
  },
  3: {
    height: '640px',
    marginLeft: '30px',
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
mergeStyles(featured, featuredGridConfig)
const lastFeatured = featured.pop()
const allPosts = [...trending, ...featured, ...trending]

function Home() {
  return (
    <main className="home">
      <section className="container">
        <div className="row">
          <h2 className="section-heading">Trending Posts</h2>
          <section className="featured-posts">
            <PostsGrid posts={featured} columns={2} ceil={true} />
            <GridPost post={lastFeatured} ceil={true} />
          </section>
        </div>
      </section>

      <section className="container">
        <div className="row">
          <Row>
            <Col lg={17} md={24}>
              <h2 className="section-heading">Recent Posts</h2>
              <PostsList posts={allPosts} />
            </Col>
            <Col lg={6} offset={1} md={0}>
              <SideBar />
            </Col>
          </Row>
        </div>
      </section>

      <section className="container">
        <div className="row">
          <h2 className="section-heading">Recommended Posts</h2>
          <PostsGrid posts={trending} columns={3} />
        </div>
      </section>
    </main>
  )
}

export default Home
