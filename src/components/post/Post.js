import React, { useContext } from 'react'
import Dante from 'Dante2'
import dayjs from 'dayjs'
import { useParams } from 'react-router'

import { usePostQuery } from '../../graphql/queries'
import { Button, Divider, Avatar } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import CommentList from './../comment/commentList'
import LikeButton from './../likeButton'
import { UserContext } from '../../store/userContext'
import { isEmpty } from '../../helpers/helpers'
import { useHistory } from 'react-router-dom'
import { useDeletePostMutation } from './../../graphql/mutations/index'

import userAvatar from './../../assets/icons/001-user.svg'

function Post() {
  let { slug } = useParams()
  let isAuthorized = false
  const { data, error, loading } = usePostQuery({ id: parseInt(slug) })
  // eslint-disable-next-line no-unused-vars
  const [deletePostMutation, mutationResults] = useDeletePostMutation()

  const { user } = useContext(UserContext)
  const history = useHistory()

  if (loading) {
    return <div>loading</div>
  }
  if (error) {
    return <div> Error </div>
  }

  const postResponse = data.getPostById

  // implies err
  if (postResponse.msg || postResponse.type) {
    return (
      <div>
        {postResponse.type} -- {postResponse.msg}
      </div>
    )
  }

  const postDetails = postResponse.post
  const {
    id,
    title,
    author,
    body,
    comments,
    likes,
    post_categories,
    created_at,
    current_like,
    img_url,
  } = postDetails
  const formattedDate = dayjs(created_at).format('MMMM DD, YYYY')
  if (user && !isEmpty(user)) {
    const { isAuthenticated } = user
    const currentUser = user.user
    if (isAuthenticated && currentUser && author.id === currentUser.id) {
      isAuthorized = true
    }
  }

  const handleDeletePost = async () => {
    const response = await deletePostMutation(id)
    if (!response.data.deletePost || !response.data.deletePost.ok) {
      console.log('Unsuccessful !!')
    } else {
      history.push('/blog')
    }
  }

  const toolBar = (
    <div className="flex-toolbar">
      <Button
        onClick={() => {
          history.push(`/blog/${id}/edit`)
        }}
      >
        <EditOutlined />
      </Button>
      <Button onClick={handleDeletePost}>
        <DeleteOutlined />
      </Button>
    </div>
  )

  return (
    <div className="post-details">
      <div className="post-head">
        <div className="author-avatar">
          {author.image_url ? (
            <Avatar src={author.image_url} />
          ) : (
            <img src={userAvatar} alt="user-avatar" width="60%" />
          )}
        </div>
        <div className="author-desc">
          <div className="author-name">
            {author.first_name} {author.last_name}
          </div>
          <br />
          <div className="author-bio">
            {author.bio
              ? author.bio
              : `${author.first_name} ${author.last_name} is a passionate writer and student at IIT Gandhinagar.`}
          </div>
        </div>
      </div>
      <div className="post-body">
        {isAuthorized && toolBar}
        <h1 className="post-title">{title}</h1>
        <div className="post-date">{formattedDate}</div>
        <div className="post-cover-image">
          <img
            src={img_url ? img_url : require(`./../../assets/images/4.jpg`)}
            className="post-item-image"
            alt="cover pic"
          />
        </div>
        <div className="post-desc">
          <Dante read_only={true} content={JSON.parse(body)} />
        </div>
      </div>
      <div className="post-foot">
        <LikeButton pid={id} current_like={current_like} />
        <div className="num-likes">
          <b>{likes}</b> likes
        </div>
      </div>
      <Divider />

      <section className="comments-container">
        <h2>Comments</h2>
        <Divider />
        <CommentList comments={comments} pid={id} />
      </section>
    </div>
  )
}

export default Post
