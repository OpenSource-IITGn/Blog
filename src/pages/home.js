import React from 'react'
import { Col, Row } from 'antd'

import PostsGrid from '../components/grid/PostsGrid'
import trending from './../assets/mocks/trending'
import featured from './../assets/mocks/featured'
import GridPost from '../components/grid/gridPost'
import PostsList from '../components/post/postsList'
import SideBar from '../components/sideBar'
// import { featuredGridConfig, mergeStyles, trendingGridConfig } from '../helpers/helpers'

// const trendingPosts = mergeStyles(trending, trendingGridConfig)
// const featuredPosts = mergeStyles(featured, featuredGridConfig)
// const lastFeatured = featuredPosts.pop()
// const allPosts = [...trendingPosts, ...featuredPosts, ...trendingPosts]

function Home() {
  return (
    <main className="home">
      <section className="container">
        <div className="row">
          <h2 className="section-heading">Trending Posts</h2>
          <section className="featured-posts">
            <PostsGrid columns={3} ceil={true} type="trending" />
          </section>
        </div>
      </section>

      <section className="container">
        <div className="row">
          <Row>
            <Col lg={17} md={24}>
              <h2 className="section-heading">Recent Posts</h2>
              {/* <PostsList posts={allPosts} /> */}
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
          {/* <PostsGrid posts={trendingPosts} columns={3} /> */}
        </div>
      </section>
    </main>
  )
}

export default Home
