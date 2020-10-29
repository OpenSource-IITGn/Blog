import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router'
import { useCreateCommentMutation, useUpdateCommentMutation } from '../../graphql/mutations'
import { UserContext } from '../../store/userContext'

function AddComment({ editMode, initialComment, pid, cid, handleAddComment, resetComment }) {
    const { user } = useContext(UserContext)
    const history = useHistory()

    const { isAuthenticated } = user
    const initialState = editMode ? initialComment : ''

    // eslint-disable-next-line no-unused-vars
    const [createCommentMutation, createCommentMutationResults] = useCreateCommentMutation()
    // eslint-disable-next-line no-unused-vars
    const [updateCommentMutation, updateCommentMutationResults] = useUpdateCommentMutation()

    const [isEditing, setIsEditing] = useState(editMode ? true : false)
    const [commentBody, setCommentBody] = useState(initialState)

    const first_name = user.user ? user.user.first_name : null
    const last_name = user.user ? user.user.last_name : null

    const handleComment = () => {
        if (!isAuthenticated) {
            history.push('/login')
        } else {
            setIsEditing(true)
        }
    }

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
                if (!response.data.updateComment || !response.data.updateComment.ok) {
                    return <div>response.updateComment.error</div>
                }
                const time = 'Just now'
                const comment = { cid, created_at: time, first_name, last_name, body: commentBody }
                resetComment(comment)
            }
        } catch (e) {
            console.log('Failed to add Comment - Try again')
        }
    }

    return (
        <div className="add-comment">
            {!isEditing ? (
                <button onClick={handleComment}>Add Comment</button>
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
                        <button onClick={handleCommentSubmit}>{editMode ? 'Update' : 'Add'}</button>
                        <button onClick={() => setIsEditing(false)}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AddComment
