import React from "react";

function GridPost({ post, ceil }) {
  const windowWidth = window.innerWidth;
  const bgStyle = {
    backgroundImage: `url("${require(`../assets/images/${post.image}`)}" )`,
  };

  const postStyles =
    windowWidth > 900 ? { ...bgStyle, ...post.style } : { ...bgStyle };

  const styles = ceil
    ? { ...postStyles, justifyContent: "space-between" }
    : { ...postStyles };

  const postCategories = post.categories.split(" ");

  return (
    <div className="grid-post overlay" style={styles} href={post.link}>
      <div className="tags-container">
        {postCategories.map((tag, index) => (
          <span className="tag" key={index}>
            {tag}
          </span>
        ))}
      </div>
      <div className="image-text">
        <h3 className="image-title">{post.title}</h3>
        <span className="image-date">{post.date}</span>
      </div>
    </div>
  );
}

export default GridPost;
