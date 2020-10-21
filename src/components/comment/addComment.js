import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router'
import { useCreateCommentMutation, useUpdateCommentMutation } from '../../graphql/mutations'
import { UserContext } from '../../store/userContext'

function AddComment({ editMode, pid, cid, handleCommentUpdate, handleAddComment }) {
  const { user } = useContext(UserContext)
  const history = useHistory()

  const { isAuthenticated } = user
  const initialState = ''

  // eslint-disable-next-line no-unused-vars
  const [createCommentMutation, createCommentMutationResults] = useCreateCommentMutation()
  // eslint-disable-next-line no-unused-vars
  const [updateCommentMutation, updateCommentMutationResults] = useUpdateCommentMutation()

  const [isEditing, setIsEditing] = useState(false)
  const [commentBody, setCommentBody] = useState(initialState)

  if (!isAuthenticated) {
    history.push('/login')
    return
  }
  
  const currentUser = user.user
  const { first_name, last_name } = currentUser

  const handleCommentSubmit = async () => {
    try {
      if (!editMode) {
        const response = await createCommentMutation(parseInt(pid), commentBody)
        if (!response.data.createComment || !response.data.createComment.ok) {
          return <div>response.createComment.error</div>
        }
        const data = response.data.createComment
        const id = data.msg
        const time = 'Just now'
        const author = { first_name, last_name }
        const comment = { id, created_at: time, comment_author: author, body: commentBody }
        handleAddComment(comment)
        setCommentBody('')
        setIsEditing(false)
      } else {
        const response = await updateCommentMutation(parseInt(cid), commentBody)
        if (!response.data.updateCommentt || !response.data.updateComment.ok) {
          return <div>response.updateComment.error</div>
        }
        const comment = {}
        handleCommentUpdate(comment)
      }
    } catch (e) {
      console.log('Failed to add Question - Try again')
    }
  }

  return (
    <div className="add-comment">
      {!isEditing ? (
        <button onClick={() => setIsEditing(true)}>Add Comment</button>
      ) : (
        <div className="add-comment-form">
          <input
            type="text-area"
            className="add-comment-input"
            placeholder="Add Comment"
            onChange={(e) => setCommentBody(e.target.value)}
            value={commentBody}
          />
          <div className="comment-btn-grp">
            <button onClick={handleCommentSubmit}>Add</button>
            <button onClick={() => setIsEditing(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AddComment
