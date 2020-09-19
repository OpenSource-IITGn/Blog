import React from "react";
import GridPost from "./gridPost";

function PostsGrid({ posts, columns, tagsPosition }) {
  return (
    <section
      className="posts-grid"
      style={{
        gridTemplateColumns: `repeat(${columns}, minmax(275px, 1fr))`,
      }}
    >
      {posts.map((post, index) => (
        <GridPost {...{ post, index, tagsPosition, key: index }} />
      ))}
    </section>
  );
}

export default PostsGrid;
