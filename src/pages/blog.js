import React from 'react'
import { useLocation, useParams } from 'react-router'
import { Col, Row } from 'antd'

import PostsList from '../components/post/postsList'
import SideBar from '../components/sideBar'
import { PAGE_SIZE } from '../config'
import { usePostsQuery } from '../graphql/queries'

function Blog() {
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
          <h2 className="section-heading">Recent Posts</h2>

          <Row justify="center">
            <Col lg={17} md={24}>
              <PostsList posts={allPosts} page={num} total={total} />
            </Col>
            {/* <Col lg={6} offset={1} md={0}>
              <SideBar />
            </Col> */}
          </Row>
        </div>
      </section>
    </main>
  )
}

export default Blog
