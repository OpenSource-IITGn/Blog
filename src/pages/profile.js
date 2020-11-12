import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../store/userContext'
import { useHistory } from 'react-router'
import { useProfileQuery } from './../graphql/queries/index'
import ProfileForm from '../components/forms/profileForm'

function Profile() {
  const { user, dispatch } = useContext(UserContext)
  const history = useHistory()
  const userId = user.user ? user.user.id : null

  const { data, error, loading } = useProfileQuery({ userId: parseInt(userId) })

  if (loading) {
    return <div>loading</div>
  }
  if (error) {
    return <div> Error </div>
  }

  const response = data.getUserProfile
  let userProfile
  try {
    if (response && response.ok && response.user) {
      userProfile = response.user
    } else {
    }
  } catch {
    if (!user || !user.user) {
      history.push('/login')
    }
  }

  return <ProfileForm profile={userProfile} />
}

export default Profile
