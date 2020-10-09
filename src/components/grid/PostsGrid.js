import React from "react";
import GridPost from "./gridPost";

function PostsGrid({ posts, columns, ceil }) {
  return (
    <section
      className="posts-grid"
      style={{
        gridTemplateColumns: `repeat(${columns}, minmax(275px, 1fr))`,
      }}
    >
      {posts.map((post, index) => (
        <GridPost {...{ post, index, ceil, key: index }} />
      ))}
    </section>
  );
}

export default PostsGrid;
