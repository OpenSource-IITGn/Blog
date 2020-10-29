import React from 'react'
import { Col, Divider, Row } from 'antd'
import { useParams } from 'react-router'
import PostsList from './post/postsList'
import { PAGE_SIZE } from '../config'
import { usePostsQuery } from '../graphql/queries'
import SideBar from './sideBar'

function Dashboard() {
    const { userId, num } = useParams()

    const { data, error, loading } = usePostsQuery({
        pageSize: PAGE_SIZE,
        page: num ? parseInt(num) - 1 : null,
        order: 'id asc',
        user_id: userId ? parseInt(userId) : null,
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
                    <h2>Dashboard</h2>
                    <Divider />
                    <Row>
                        <Col lg={17} md={24}>
                            <h2 className="section-heading">My Posts</h2>
                            <PostsList
                                posts={allPosts}
                                page={num}
                                total={total}
                                route={`/user/${userId}/posts`}
                            />
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

export default Dashboard
