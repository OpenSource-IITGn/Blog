import React, { useContext, useState } from 'react'
import dayjs from 'dayjs'
import { Button, Divider } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import AddComment from './addComment'
import { useDeleteCommentMutation } from './../../graphql/mutations/index'
import { UserContext } from '../../store/userContext'
import { isEmpty } from '../../helpers/helpers'

function CommentItem({ comment, handleCommentUpdate, deleteComment }) {
    const [editComment, setEditComment] = useState(false)
    const { id, created_at, updated_at, body, comment_author } = comment
    const { first_name, last_name } = comment_author
    const [deleteCommentMutation, mutationResults] = useDeleteCommentMutation()
    let isAuthorized = false
    const { user } = useContext(UserContext)

    if (user && !isEmpty(user)) {
        const { isAuthenticated } = user
        const currentUser = user.user
        if (isAuthenticated && currentUser && comment_author.id === currentUser.id) {
            isAuthorized = true
        }
    }

    const [commentState, setCommentState] = useState({
        id,
        created_at,
        updated_at,
        body,
        first_name,
        last_name,
    })
    const formattedDate =
        commentState.created_at === 'Just now'
            ? commentState.created_at
            : dayjs(commentState.created_at.toString()).format('MMMM DD, YYYY')

    const handleEditComment = () => {
        setEditComment(true)
    }

    const handleDeleteComment = async () => {
        const response = await deleteCommentMutation(id)
        if (!response.data.deleteComment || !response.data.deleteComment.ok) {
            console.log('Unsuccessful !!')
        } else {
            deleteComment(id)
        }
    }

    const resetComment = (comment) => {
        setEditComment(false)
        setCommentState(comment)
    }

    const toolBar = (
        <div className="flex-toolbar">
            <Button onClick={handleEditComment}>
                <EditOutlined />
            </Button>
            <Button onClick={handleDeleteComment}>
                <DeleteOutlined />
            </Button>
        </div>
    )

    const commentBody = (
        <>
            <div className="comment-item">
                <div className="comment-main">
                    <div className="comment-author">
                        {commentState.first_name} {commentState.last_name}
                    </div>
                    <div className="comment-body">{commentState.body}</div>
                </div>
                <div className="comment-time">{formattedDate}</div>
                {isAuthorized && toolBar}
            </div>
            <Divider />
        </>
    )

    const editCommentBody = (
        <>
            <AddComment
                editMode
                initialComment={commentState.body}
                cid={id}
                handleCommentUpdate={handleCommentUpdate}
                resetComment={resetComment}
            />
        </>
    )
    return editComment ? editCommentBody : commentBody
}

export default CommentItem
