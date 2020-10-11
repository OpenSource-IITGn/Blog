import React from 'react'
import dayjs from 'dayjs'

function CommentItem({ comment }) {
  const { id, created_at, updated_at, body, comment_author } = comment
  const { first_name, last_name } = comment_author
  const formattedDate = dayjs(created_at.toString()).format('MMMM DD, YYYY')
  console.log('comment', created_at)
  console.log('comment', created_at.toString())

  return (
    <div className="comment-item">
      <div className="comment-body">{body}</div>
      <div className="comment-author">{first_name}</div>
      <div className="comment-time">{formattedDate}</div>
    </div>
  )
}

export default CommentItem
