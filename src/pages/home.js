import React from 'react'
import { Col, Divider, Row } from 'antd'

import PostsGrid from '../components/grid/PostsGrid'
import SideBar from '../components/sideBar'
import PostsList from '../components/post/postsList'
import { usePostsQuery } from '../graphql/queries'
import { useLocation, useParams } from 'react-router'
import { PAGE_SIZE } from '../config'
import { divider } from 'Dante2/package/es/components/icons'
// import { featuredGridConfig, mergeStyles, trendingGridConfig } from '../helpers/helpers'

// const trendingPosts = mergeStyles(trending, trendingGridConfig)
// const featuredPosts = mergeStyles(featured, featuredGridConfig)
// const lastFeatured = featuredPosts.pop()
// const allPosts = [...trendingPosts, ...featuredPosts, ...trendingPosts]

function Home() {
  const { cat, num } = useParams()
  const { state } = useLocation()
  const search_query = state && state.searchQuery ? state.searchQuery : null

  const { data, error, loading } = usePostsQuery({
    pageSize: PAGE_SIZE,
    page: num ? parseInt(num) - 1 : null,
    category_id: cat ? parseInt(cat) : null,
    search_query: search_query,
    order: 'id asc',
  })

  if (loading) {
    return <div>loading</div>
  }
  if (error) {
    return <div> Error : {error.toString()} </div>
  }

  const postsResponse = data.getPosts
  // implies err
  if (postsResponse.msg || postsResponse.type) {
    return (
      <div>
        {postsResponse.type} -- {postsResponse.msg}
      </div>
    )
  }

  const total = postsResponse.total
  const allPosts = postsResponse.posts.map((post) => {
    return { ...post, image: '1.jpg' }
  })

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
      <Divider />
      <section className="container">
        <div className="row">
          <Row>
            <Col lg={17} md={24}>
              <h2 className="section-heading">Recent Posts</h2>
              <PostsList posts={allPosts} page={num} total={total} />
            </Col>
            <Col lg={6} offset={1} md={0}>
              <SideBar />
            </Col>
          </Row>
        </div>
      </section>
      <Divider />
      <section className="container">
        <div className="row">
          <h2 className="section-heading">Recommended Posts</h2>
          <PostsGrid type="recommended" columns={3} />
        </div>
      </section>
    </main>
  )
}

export default Home
