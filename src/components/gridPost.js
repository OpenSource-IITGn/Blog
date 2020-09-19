import React from "react";

function GridPost({ post }) {
  console.log(post);
  const bgStyle = {
    backgroundImage: `url("${require(`../assets/images/${post.image}`)}" )`,
  };

  const styles = { ...bgStyle, ...post.style };
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
        <h2 className="image-title">{post.title}</h2>
        <span className="image-date">{post.date}</span>
      </div>
    </div>
  );
}

export default GridPost;
