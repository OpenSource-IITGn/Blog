import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Col, Divider, Row } from 'antd'

import TagsContainer from './../tagsContainer'
import dayjs from 'dayjs'

function PostItem({ post }) {
    let history = useHistory()

    let postCategories = post.categories
    const { created_at, author_name, img_url } = post
    const formattedDate = dayjs(created_at).format('MMMM DD, YYYY')

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
                        <div className="post-author">By - {author_name}</div>
                        <div className="post-date">{formattedDate}</div>
                        <div className="post-desc">{post.description}</div>
                        <div className="more-button">Read more ...</div>
                    </div>
                </Col>
                <Col span={7}>
                    <figure>
                        {/* <Link to={post.link}> */}
                        <img
                            src={img_url ? img_url : require(`./../../assets/images/3.jpg`)}
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
