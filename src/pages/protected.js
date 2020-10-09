import React, { useContext } from 'react'

import { useAuthToken } from './../helpers/authToken'
import { Route, Redirect } from 'react-router-dom'
import { UserContext } from '../store/userContext'

export default function ProtectedRoute({ component: Component, ...props }) {
  let [authToken] = useAuthToken()
  const { user } = useContext(UserContext)
  const { isAuthenticated } = user
  let isAuthorized = false

  if (isAuthenticated && authToken) {
    isAuthorized = true
  }

  return (
    <Route
      {...props}
      render={(props) =>
        isAuthorized ? <Component user={user} {...props} /> : <Redirect to="/login" />
      }
    />
  )
}
