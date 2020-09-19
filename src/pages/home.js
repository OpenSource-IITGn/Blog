import React from "react";
import PostsGrid from "../components/PostsGrid";
import trending from "./../assets/mocks/trending";
import featured from "./../assets/mocks/featured";

const trendingGridConfig = {
  1: {
    gridArea: "1 / 2 / 3 / 3",
  },
};

const mergeStyles = (posts, config) => {
  posts.forEach((post, index) => {
    post.style = config[index];
  });
};

mergeStyles(trending, trendingGridConfig);

function Home() {
  return (
    <section className="container home">
      <div className="row">
        <h2>Trending Posts</h2>
        <PostsGrid posts={trending} columns={3} />
      </div>
    </section>
  );
}

export default Home;
