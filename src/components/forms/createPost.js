import { Col, Divider, Row, Switch } from 'antd'
import React, { useEffect, useState } from 'react'
import { useCreatePostMutation } from '../../graphql/mutations'
import { useHistory, useLocation, useParams } from 'react-router'
import { usePostQuery } from '../../graphql/queries'
import Dante from 'Dante2'
import { DanteTooltipConfig } from 'Dante2/package/es/components/popovers/toolTip.js'
import Icons, { divider } from 'Dante2/package/es/components/icons'

function CreatePost({ isEditing }) {
  const [createPostMutation, createPostMutationResults] = useCreatePostMutation()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const history = useHistory()
  const { postId } = useParams()
  const { data, error, loading } = usePostQuery({ id: parseInt(postId) }, !isEditing)
  const [bodyText, setBodyText] = useState(null)
  const [formState, setFormState] = useState(() => ({
    _id: null,
    body: null,
    title: '',
    tags: '',
    file: null,
    imgPreview: null,
    waiting: isEditing,
  }))

  useEffect(() => {
    if (isEditing) {
      if (loading) {
        return
      }
      if (error) {
        return
      }

      const postResponse = data.getPostById

      // implies err
      if (postResponse.msg || postResponse.type) {
        return
      }
      const postDetails = postResponse.post
      setBodyText(JSON.parse(postDetails.body))
      const tagList = postDetails.post_categories
        ? postDetails.post_categories.map((c) => c.label)
        : []

      setFormState({
        body: postDetails.body,
        title: postDetails.title,
        tags: tagList.join(),
        file: null,
        imgPreview: null,
        waiting: false,
      })
    }
  }, [error, loading, isEditing, data])

  if (isEditing) {
    if (loading) {
      return <div>loading</div>
    }
    if (error) {
      return <div> Error : console.error </div>
    }
  }

  const { body, title, tags, waiting } = formState

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
    }))
  }

  const handleSave = async (e) => {
    e.preventDefault()

    setIsSaving(true)
    if (!title || !body.blocks[0].text) return // body.blocks[0].text: First Paragrah in Dante

    try {
      const categories = tags
      const response = await createPostMutation(
        title,
        JSON.stringify(body),
        categories,
        isSubmitting
      )
      if (!response.data.createPost || !response.data.createPost.ok) {
        return <div>response.createPost.error</div>
      }
      history.push('/blog')
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
                  <Dante
                    className="blog-editor"
                    content={bodyText}
                    tooltips={[
                      DanteTooltipConfig({
                        widget_options: {
                          block_types: [
                            {
                              label: 'h2',
                              style: 'header-two',
                              type: 'block',
                              icon: Icons.h2,
                            },
                            {
                              label: 'h3',
                              style: 'header-three',
                              type: 'block',
                              icon: Icons.h3,
                            },
                            { type: 'separator' },
                            { type: 'link' },

                            {
                              label: 'blockquote',
                              style: 'blockquote',
                              type: 'block',
                              icon: Icons.blockquote,
                            },
                            { type: 'separator' },
                            {
                              label: 'bold',
                              style: 'BOLD',
                              type: 'inline',
                              icon: Icons.bold,
                            },
                            {
                              label: 'italic',
                              style: 'ITALIC',
                              type: 'inline',
                              icon: Icons.italic,
                            },
                            {
                              label: 'code',
                              style: 'code-block',
                              type: 'block',
                              icon: Icons.code,
                            },
                            {
                              label: 'insertunorderedlist',
                              style: 'unordered-list-item',
                              type: 'block',
                              icon: Icons.insertunorderedlist,
                            },
                            {
                              label: 'insertorderedlist',
                              style: 'ordered-list-item',
                              type: 'block',
                              icon: Icons.insertunorderedlist,
                            },
                          ],
                        },
                      }),
                    ]}
                    onChange={(editor) => handleChange(editor)}
                  />
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
