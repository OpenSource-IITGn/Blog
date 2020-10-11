import React from 'react'
import dayjs from 'dayjs'
import { Divider } from 'antd'

function CommentItem({ comment }) {
  const { id, created_at, updated_at, body, comment_author } = comment
  const { first_name, last_name } = comment_author
  const formattedDate =
    created_at === 'Just now' ? created_at : dayjs(created_at.toString()).format('MMMM DD, YYYY')

  return (
    <>
      <div className="comment-item">
        <div className="comment-main">
          <div className="comment-author">
            {first_name} {last_name}
          </div>
          <div className="comment-body">{body}</div>
        </div>
        <div className="comment-time">{formattedDate}</div>
      </div>
      <Divider />
    </>
  )
}

export default CommentItem
