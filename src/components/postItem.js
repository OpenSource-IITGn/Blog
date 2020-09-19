import { Col, Row } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import TagsContainer from "./tagsContainer";

function PostItem({ post }) {
  const postCategories = post.categories.split(" ");
  return (
    <div className="post-item">
      <Row>
        <Col span={12}>
          <div className="post-content">
            <h3 className="post-title">{post.title}</h3>
            <TagsContainer postCategories={postCategories} theme="dark" />
            <div className="post-author">By - {post.author}</div>
            <div className="post-date">{post.date}</div>
            <div className="post-desc">{post.description}</div>
            <div className="more-button">Read more ...</div>
          </div>
        </Col>
        <Col span={6}>
          <figure>
            <Link to={post.link}>
              <img
                src={require(`./../assets/images/${post.image}`)}
                className="post-item-image"
                alt={post.image}
              />
            </Link>
          </figure>
        </Col>
      </Row>
    </div>
  );
}

export default PostItem;
