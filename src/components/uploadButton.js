import React, { useState } from 'react'
import { Upload, message, Button } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'

const getBase64 = (img, callback) => {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}

const beforeUpload = (file) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!')
  }
  const isLt2M = file.size / 1024 / 1024 < 2
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!')
  }
  return isJpgOrPng && isLt2M
}

const uploadProps = {
  showUploadList: false,
  headers: {
    authorization: 'authorization-text',
  },
  beforeUpload: beforeUpload,
  progress: {
    strokeColor: {
      '0%': '#108ee9',
      '100%': '#87d068',
    },
    strokeWidth: 3,
    format: (percent) => `${parseFloat(percent.toFixed(2))}%`,
  },
}

const UploadCover = ({ edit, addImageUrl, uploadPreset, isAvatar }) => {
  const [imageUrl, setImageUrl] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true)
      return
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (imageUrl) => {
        setImageUrl(imageUrl)
      })
    }
  }

  const uploadButton = (
    <Button icon={<UploadOutlined />}>
      {loading && <LoadingOutlined />}
      {edit ? 'Replace Cover Photo' : 'Upload Cover Photo'}
    </Button>
  )

  const handleUpload = async (file) => {
    setLoading(true)
    const data = new FormData()
    data.append('file', file)
    data.append('upload_preset', uploadPreset)

    const apiURL = 'https://api.cloudinary.com/v1_1/de3dx8v5a/image/upload'
    const res = await fetch(apiURL, {
      method: 'POST',
      body: data,
    })

    const fileImage = await res.json()

    setImageUrl(fileImage.secure_url)
    addImageUrl(fileImage.secure_url)
    setLoading(false)
  }
  return (
    <div>
      <Upload
        {...uploadProps}
        onChange={handleChange}
        name="avatar"
        className="avatar-uploader"
        action={handleUpload}
      >
        {imageUrl ? (
          <img src={imageUrl} alt="cover" style={{ width: isAvatar ? '150px' : '100%' }} />
        ) : (
          uploadButton
        )}
      </Upload>
    </div>
  )
}
export default UploadCover
