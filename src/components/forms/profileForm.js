import React, { useState } from 'react'
import { EditOutlined, CheckOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { Avatar, Button, Col, Divider, Row, Upload } from 'antd'
import UploadCover from '../uploadButton'
import { useUpdateProfileMutation } from './../../graphql/mutations/index'
import { useHistory } from 'react-router'

function ProfileForm({ profile }) {
  const [update, setUpdate] = useState(false)
  const history = useHistory()
  const [updateProfileMutation, updateProfileMutationResults] = useUpdateProfileMutation()

  const [formState, setFormState] = useState({
    firstName: profile.first_name,
    lastName: profile.last_name,
    bio: profile.bio,
    avatarUrl: profile.image_url ? profile.image_url : '',
  })

  const isEditing = profile.image_url ? true : false

  const handleChange = (evt) => {
    const value = evt.target.value
    const name = evt.target.name
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const { firstName, lastName, bio, avatarUrl } = formState
  const email = profile.email

  const addImage = (imgUrl) => {
    setFormState((prevState) => ({
      ...prevState,
      avatarUrl: imgUrl,
    }))
  }

  const handleSubmit = async () => {
    try {
      const response = await updateProfileMutation(firstName, lastName, bio, avatarUrl, email)
      if (!response.data.updateProfile || !response.data.updateProfile.ok) {
        return <div>response.createPost.error</div>
      }
      history.push('/blog')
    } catch (err) {}
  }
  return (
    <main className="home">
      <section className="container">
        <div className="row">
          <Row>
            <Col lg={17} md={24}>
              <div className="user-profile">
                <h2 className="heading">About</h2>
                <Button onClick={() => setUpdate(!update)}>
                  {update ? <CheckOutlined /> : <EditOutlined />}
                </Button>
                <Divider />
                <div className="user-name">
                  <div className="first-name">
                    <input
                      type="firstname"
                      name="firstname"
                      value={firstName}
                      onChange={handleChange}
                      placeholder="First Name"
                    />
                  </div>
                  <div className="last-name">
                    <input
                      type="lastName"
                      name="lastName"
                      value={lastName}
                      onChange={handleChange}
                      placeholder="Last Name"
                    />
                  </div>
                </div>
                <div className="user-bio">
                  <input
                    type="bio"
                    name="bio"
                    value={bio}
                    onChange={handleChange}
                    placeholder="Enter info about yourself"
                  />
                </div>
                <div className="user-avatar">
                  {isEditing && <img src={profile.image_url} width="150px" />}
                  <UploadCover
                    edit={isEditing}
                    addImageUrl={addImage}
                    uploadPreset="avatar_iitgn"
                    isAvatar={true}
                  />
                </div>
                <Divider />
                <button className="add-form-btn" onClick={handleSubmit}>
                  Submit
                </button>
              </div>
            </Col>
          </Row>
        </div>
      </section>
    </main>
  )
}

export default ProfileForm
