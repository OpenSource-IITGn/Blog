import { Button, Col, Divider, Row, Upload } from 'antd'
import React, { useContext, useState } from 'react'
import { EditOutlined, CheckOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { UserContext } from '../store/userContext'
import { useHistory } from 'react-router'

function Profile() {
  const { user, dispatch } = useContext(UserContext)
  const history = useHistory()

  const first_name = user.user ? user.user.first_name : ''
  const last_name = user.user ? user.user.last_name : ''

  const [update, setUpdate] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formState, setFormState] = useState({
    firstName: first_name,
    lastName: last_name,
    bio: '',
    avatarUrl: '',
  })

  if (!user || !user.user) {
    history.push('/login')
  }

  const handleChange = (evt) => {
    const value = evt.target.value
    const name = evt.target.name
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const { firstName, lastName, bio, avatarUrl } = formState
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  )

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
                  <Upload
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  >
                    {avatarUrl.length !== 0 ? (
                      <img src={avatarUrl} alt="avatar" style={{ width: '100%' }} />
                    ) : (
                      uploadButton
                    )}
                  </Upload>
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

export default Profile
