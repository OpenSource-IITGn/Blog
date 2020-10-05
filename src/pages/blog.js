import { Col, Row } from 'antd'
import React from 'react'
import { useParams } from 'react-router'
import PostsList from '../components/postsList'
import SideBar from '../components/sideBar'
import { usePostsQuery } from '../graphql/queries'

function Blog() {
  const { cat } = useParams()

  const { data, error, loading } = usePostsQuery({
    pageSize: 2,
    page: 0,
    category_id: cat ? parseInt(cat) : null,
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

  const allPosts = postsResponse.posts.map((post) => {
    return { ...post, image: '1.jpg' }
  })

  return (
    <main className="home">
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
    </main>
  )
}

export default Blog
