import { Col, Row } from 'antd'
import React, { useState } from 'react'
import Dante from 'Dante2'
import { DanteTooltipConfig } from 'Dante2/package/es/components/popovers/toolTip.js'
import Icons from 'Dante2/package/es/components/icons'
import { useCreatePostMutation } from '../../graphql/mutations'
import { useHistory } from 'react-router'

function CreatePost() {
  const [createPostMutation, createPostMutationResults] = useCreatePostMutation()

  let history = useHistory()

  const [formState, setFormState] = useState(() => ({
    _id: null,
    body: null,
    title: '',
    tags: '',
    file: null,
    imgPreview: null,
  }))

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const { body, _id, imgPreview, title, tags, file, loading } = formState

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

  const handleFileChange = (files) => {
    const file = files[0]
    const reader = new FileReader()
    if (file) reader.readAsDataURL(file)

    reader.onloadend = () => {
      setFormState((prevState) => ({
        ...prevState,
        file,
        imgPreview: reader.result,
      }))
    }
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
      const response = await createPostMutation(title, JSON.stringify(body), categories)
      console.log(response)
      if (!response.data.createPost || !response.data.createPost.ok) {
        return <div>response.createPost.error</div>
      }
      history.push('/blog')
    } catch (e) {
      console.log('Failed to add Question - Try again')
    }
  }

  const handlePublish = (e) => {
    setIsSubmitting(true)
  }

  return (
    <main className="home">
      <section className="container">
        <div className="row">
          <Row justify="center">
            <Col lg={18} md={24}>
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
                  tooltips={[
                    DanteTooltipConfig({
                      widget_options: {
                        placeholder: 'Вставьте ссылку...',
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
                <button className="add-form-btn" onClick={handleSave}>
                  Save
                </button>
                <button className="add-form-btn publish-btn" type="submit" onClick={handlePublish}>
                  Publish
                </button>
              </form>
            </Col>
          </Row>
        </div>
      </section>
    </main>
  )
}

export default CreatePost
