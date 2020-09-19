import React from "react";
import PostsGrid from "../components/PostsGrid";
import trending from "./../assets/mocks/trending";
import featured from "./../assets/mocks/featured";
import GridPost from "../components/gridPost";

const trendingGridConfig = {
  1: {
    gridArea: "1 / 2 / 3 / 3",
  },
};

const featuredGridConfig = {
  0: {
    gridArea: "1 / 1 / 2 / 3",
    height: "300px",
  },
  1: {
    height: "300px",
  },
  3: {
    height: "640px",
    marginLeft: "30px",
  },
};

const mergeStyles = (posts, config) => {
  posts.forEach((post, index) => {
    post.style = config[index];
  });
};

mergeStyles(trending, trendingGridConfig);
mergeStyles(featured, featuredGridConfig);
const lastFeatured = featured.pop();

function Home() {
  return (
    <section className="container home">
      <div className="row">
        <h2>Featured Posts</h2>
        <section className="featured-posts">
          <PostsGrid posts={featured} columns={2} />
          <GridPost post={lastFeatured} />
        </section>
        <h2>Trending Posts</h2>
        <PostsGrid posts={trending} columns={3} />
      </div>
    </section>
  );
}

export default Home;
