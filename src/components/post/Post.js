import React from 'react'
import Dante from 'Dante2'
import dayjs from 'dayjs'
import { useParams } from 'react-router'

import { usePostQuery } from '../../graphql/queries'

function Post() {
  let { slug } = useParams()
  const { data, error, loading } = usePostQuery({ id: parseInt(slug) })

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
  const { id, title, author, body, comments, likes, post_categories, created_at } = postDetails
  const formattedDate = dayjs(created_at).format('MMMM DD, YYYY')

  return (
    <div className="post-details">
      <div className="post-head">
        <div className="author-avatar">
          <img
            src="https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/00/00d168bf49d5f1774c633a7dcc3a1f4a51395bc2_full.jpg"
            alt="dummy"
          />
        </div>
        <div className="author-desc">
          <div className="author-name">
            {author.first_name} {author.last_name}
          </div>
          <br />
          <div className="author-bio">
            {author.first_name} is a technical writer who covers frontend frameworks, web standards,
            accessibility, WordPress development, UX design, and more
          </div>
        </div>
      </div>
      <div className="post-body">
        <h1 className="post-title">{title}</h1>
        <div className="post-date">{formattedDate}</div>
        <div className="post-cover-image">
          <img
            src={require(`./../../assets/images/4.jpg`)}
            className="post-item-image"
            alt="4.jpg"
          />
        </div>
        <div className="post-desc">
          <Dante read_only={true} content={JSON.parse(body)} />
        </div>
      </div>
      <div className="post-foot"></div>
    </div>
  )
}

export default Post