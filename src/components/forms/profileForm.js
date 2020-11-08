import React, { useState } from 'react'
import { EditOutlined, CheckOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Col, Divider, Row, Upload } from 'antd'
import UploadCover from '../uploadButton'

function ProfileForm({ profile }) {
  const [update, setUpdate] = useState(false)
  const [formState, setFormState] = useState({
    firstName: profile.first_name,
    lastName: profile.last_name,
    bio: profile.bio,
    avatarUrl: profile.image_url ? profile.image_url : '',
  })

  const handleChange = (evt) => {
    const value = evt.target.value
    const name = evt.target.name
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const { firstName, lastName, bio, avatarUrl } = formState

  const addImage = (imgUrl) => {
    setFormState((prevState) => ({
      ...prevState,
      avatarUrl: imgUrl,
    }))
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
                  {/* <UploadCover edit={false} addImageUrl={addImage} uploadPreset="avatar_iitgn" /> */}
                </div>
                <button className="add-form-btn">Submit</button>
              </div>
            </Col>
          </Row>
        </div>
      </section>
    </main>
  )
}

export default ProfileForm
