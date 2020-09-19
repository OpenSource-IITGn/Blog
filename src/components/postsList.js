import { Pagination } from "antd";
import React, { useMemo, useState } from "react";
import PostItem from "./postItem";

function PostsList({ posts }) {
  const [pageSize, setPageSize] = useState(5);
  const [current, setCurrent] = useState(1);

  const currentPagePosts = useMemo(() => {
    const lastIndex = current * pageSize;
    const firstIndex = lastIndex - pageSize;

    return posts.slice(firstIndex, lastIndex);
  }, [posts, current, pageSize]);

  return (
    <section className="posts-list">
      <div className="posts-container">
        {currentPagePosts.map((post, index) => (
          <PostItem post={post} key={index} />
        ))}
      </div>
      <Pagination
        simple
        showSizeChanger
        onShowSizeChange={setPageSize}
        pageSize={pageSize}
        defaultCurrent={current}
        onChange={setCurrent}
        total={posts.length}
      />
    </section>
  );
}

export default PostsList;
