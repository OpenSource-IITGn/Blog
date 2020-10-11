import React from 'react'
import CommentItem from './commentItem'

function CommentList({ comments }) {
  const allComments = comments.map((c) => <CommentItem key={c.id} comment={c} />)

  return <div className="comments-body">{allComments}</div>
}

export default CommentList
