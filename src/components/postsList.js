import { Pagination } from 'antd'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import PostItem from './postItem'
import { useHistory } from 'react-router'
import { PAGE_SIZE } from '../config'

function PostsList({ posts, page, total }) {
  const history = useHistory()
  const [pageSize, setPageSize] = useState(PAGE_SIZE)

  const currentPage = page ? page : 1
  const [current, setCurrent] = useState(currentPage)

  const isFirstRun = useRef(true)

  const handlePageChange = (val) => {
    setCurrent(val)
    history.push(`/blog/page=${val}`)
  }

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false
      return
    }
    window.scroll({
      top: 500,
      left: 0,
      behavior: 'smooth',
    })
  }, [current, pageSize])

  return (
    <section className="posts-list">
      <div className="flex-container">
        <div className="posts-container">
          {posts.map((post, index) => (
            <PostItem post={post} key={index} />
          ))}
        </div>
      </div>
      <Pagination
        simple
        showSizeChanger
        onShowSizeChange={setPageSize}
        pageSize={pageSize}
        defaultCurrent={current}
        onChange={handlePageChange}
        total={total}
      />
    </section>
  )
}

export default PostsList
