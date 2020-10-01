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
    tags: [],
    file: null,
    imgPreview: null,
  }))

  const [isSubmitting, setIsSubmitting] = useState(false)

  const { body, _id, imgPreview, title, tags, file, loading } = formState

  const handleTitleChange = (e) => {
    const title = e.target.value
    setFormState((prevState) => ({
      ...prevState,
      title,
    }))
  }

  const handleTagsChange = (event, newTags) => {
    setFormState((prevState) => ({
      ...prevState,
      tags: newTags.length > 6 ? tags : newTags,
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

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!title || !body.blocks[0].text) return // body.blocks[0].text: First Paragrah in Dante

    setIsSubmitting(true)

    try {
      const categories = 'cat1, cat2'
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

  const handleChange = (editor) => {
    setFormState((prevState) => ({
      ...prevState,
      body: editor.emitSerializedOutput(),
    }))
    console.log(JSON.stringify(editor.emitSerializedOutput()))
  }

  return (
    <main className="home">
      <section className="container">
        <div className="row">
          <Row justify="center">
            <Col lg={18} md={24}>
              <form onSubmit={handleSubmit}>
                <input
                  className="post-title-input"
                  placeholder="Write Blog title"
                  value={formState.title}
                  onChange={handleTitleChange}
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
                <button>Submit</button>
              </form>
            </Col>
          </Row>
        </div>
      </section>
    </main>
  )
}

export default CreatePost
