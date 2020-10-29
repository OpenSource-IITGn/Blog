import React, { useState } from 'react'
import dayjs from 'dayjs'
import { Button, Divider } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import AddComment from './addComment'

function CommentItem({ comment, handleCommentUpdate }) {
    const [editComment, setEditComment] = useState(false)
    const { id, created_at, updated_at, body, comment_author } = comment
    const { first_name, last_name } = comment_author
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

    const resetComment = (comment) => {
        setEditComment(false)
        setCommentState(comment)
    }

    const toolBar = (
        <div className="flex-toolbar">
            <Button onClick={handleEditComment}>
                <EditOutlined />
            </Button>
            <Button onClick={() => {}}>
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
                {toolBar}
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
