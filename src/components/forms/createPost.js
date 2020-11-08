/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router'
import { Col, Divider, Row, Switch } from 'antd'

import { useCreatePostMutation, useUpdatePostMutation } from '../../graphql/mutations'
import { usePostQuery } from '../../graphql/queries'
import { UserContext } from '../../store/userContext'
import PostEditor from './postEditor'
import UploadCover from './../uploadButton'
import { getTextFromEditor } from '../../helpers/helpers'

function CreatePost() {
  const { postId } = useParams()
  const { user } = useContext(UserContext)
  const history = useHistory()

  const { isAuthenticated } = user
  const currentUser = user.user
  const isEditing = postId ? true : false

  // eslint-disable-next-line no-unused-vars
  const [createPostMutation, createPostMutationResults] = useCreatePostMutation()
  const [updatePostMutation, updatePostMutationResults] = useUpdatePostMutation()
  const { data, error, loading } = usePostQuery({ id: parseInt(postId) }, !isEditing)

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [bodyText, setBodyText] = useState(null)
  const [formState, setFormState] = useState(() => ({
    id: null,
    body: null,
    title: '',
    tags: '',
    file: null,
    img_url: null,
    waiting: isEditing,
    desc: '',
  }))

  useEffect(() => {
    if (isEditing) {
      if (loading || error) {
        return
      }
      const postResponse = data.getPostById

      // implies err
      if (postResponse.msg || postResponse.type) {
        return
      }

      const postDetails = postResponse.post
      const { author } = postDetails

      //  unauthorized access
      if (!isAuthenticated || !currentUser || author.id !== currentUser.id) {
        history.push(`/blog/${postDetails.id}`)
        return
      }
      // manage body initialization
      setBodyText(JSON.parse(postDetails.body))

      const tagList = postDetails.post_categories
        ? postDetails.post_categories.map((c) => c.label)
        : []

      setFormState({
        id: postDetails.id,
        body: postDetails.body,
        title: postDetails.title,
        tags: tagList.join(),
        file: null,
        img_url: null,
        waiting: false,
      })
    }
  }, [error, loading, isEditing, data, isAuthenticated, currentUser, history])

  if (isEditing) {
    if (loading) {
      return <div>loading</div>
    }
    if (error) {
      return <div> Error: {`${error}`} </div>
    }
  }

  const { id, body, title, tags, waiting, img_url, desc } = formState

  // handle State changes
  const handleTitleChange = (e) => {
    const title = e.target.value
    setFormState((prevState) => ({
      ...prevState,
      title,
    }))
  }

  const handleCategoriesChange = (e) => {
    const newTags = e.target.value
    setFormState((prevState) => ({
      ...prevState,
      tags: newTags,
    }))
  }

  const handleChange = (editor) => {
    setFormState((prevState) => ({
      ...prevState,
      body: editor.emitSerializedOutput(),
      desc: getTextFromEditor(editor.state.editorState),
    }))
  }

  const addImage = (imgUrl) => {
    setFormState((prevState) => ({
      ...prevState,
      img_url: imgUrl,
    }))
  }

  const handleSave = async (e) => {
    e.preventDefault()
    setIsSaving(true)
    if (!title || !body.blocks[0].text) return // body.blocks[0].text: First Paragrah in Dante
    const description = desc.slice(0, 195)

    try {
      const categories = tags

      if (!isEditing) {
        const response = await createPostMutation(
          title,
          JSON.stringify(body),
          categories,
          isSubmitting,
          img_url,
          description
        )
        if (!response.data.createPost || !response.data.createPost.ok) {
          return <div>response.createPost.error</div>
        }
        history.push('/blog')
      } else {
        const response = await updatePostMutation(
          parseInt(id),
          title,
          JSON.stringify(body),
          categories,
          isSubmitting,
          img_url,
          description
        )
        if (!response.data.updatePost || !response.data.updatePost.ok) {
          return <div>response.createPost.error</div>
        }
        history.push(`/blog/${id}`)
      }

      setIsSubmitting(false)
      setIsSubmitting(false)
    } catch (e) {
      console.log('Failed to add Question - Try again')
    }
  }

  const handlePublish = (checked) => {
    setIsSubmitting(checked)
  }

  return (
    <main className="home">
      <section className="container">
        <div className="row">
          <Row justify="center">
            <Col lg={18} md={24}>
              {!waiting && (
                <form>
                  <input
                    className="post-title-input"
                    placeholder="Write Blog title"
                    value={title}
                    onChange={handleTitleChange}
                  />
                  <input
                    className="categories-input"
                    placeholder="Tags ( comma separated )"
                    value={tags}
                    onChange={handleCategoriesChange}
                  />
                  <UploadCover edit={isEditing} addImageUrl={addImage} uploadPreset="blog_iitgn" />
                  <PostEditor bodyText={bodyText} handleChange={handleChange} />
                  <Divider />
                  <div className="publish-toggle-btn">
                    <p>Publish</p>
                    <Switch defaultChecked onChange={handlePublish} />
                  </div>
                  <button className="add-form-btn" onClick={handleSave}>
                    Save
                  </button>
                </form>
              )}
            </Col>
          </Row>
        </div>
      </section>
    </main>
  )
}

export default CreatePost
