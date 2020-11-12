import React, { useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router'
import { Pagination } from 'antd'

import PostItem from './postItem'
import { PAGE_SIZE } from '../../config'

function PostsList({ posts, page, total, route }) {
  const history = useHistory()
  const isFirstRun = useRef(true)
  const [pageSize, setPageSize] = useState(PAGE_SIZE)

  const currentPage = page ? page : 1
  const [current, setCurrent] = useState(currentPage)

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

  // change state functions
  const handlePageChange = (val) => {
    const nextPageRoute = `${route ? route : `/blog`}/page=${val}`
    setCurrent(val)
    history.push(`${route ? route : `/blog`}/page=${val}`)
  }

  return (
    <section className="posts-list">
      <div className="flex-container" style={{ justifyContent: 'center' }}>
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
