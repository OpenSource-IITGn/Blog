import React, { useState } from 'react'
import CommentItem from './commentItem'
import AddComment from './addComment'

function CommentList({ comments, pid }) {
  const [commentsList, setCommentsList] = useState(comments)

  const allComments = commentsList.map((c) => <CommentItem key={c.id} comment={c} />)

  const handleAddComment = (comment) => {
    setCommentsList([...commentsList, comment])
  }

  const handleCommentUpdate = (comment) => {
    const updateCommentList = commentsList.map((c) => (comment.id === c.id ? comment : c))
    setCommentsList(updateCommentList)
  }

  return (
    <div className="comments-body">
      {allComments}
      <AddComment handleAddComment={handleAddComment} editMode={false} pid={pid} />
    </div>
  )
}

export default CommentList
