import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router'
import { useLoginMutation } from '../../graphql/mutations/authMutations'
import { UserContext } from '../../store/userContext'

function Login() {
  const [loginMutation, loginMutationResults] = useLoginMutation()
  const history = useHistory()
  const { dispatch } = useContext(UserContext)
  const [formState, setFormState] = useState(() => ({
    email: '',
    password: '',
  }))

  const { email, password } = formState

  const handleChange = (evt) => {
    const value = evt.target.value
    const name = evt.target.name
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const data = await loginMutation(email, password)
      const signIndata = data.data.signIn
      if (signIndata.ok) {
        const { first_name, last_name, id } = signIndata.user
        dispatch({ type: 'LOGIN', user: { first_name, last_name, id } })
        history.push('/home')
      } else {
        history.push('/login')
      }
    } catch (e) {
      console.log('Network or server Error')
    }
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <div className="form-head">Login</div>
      <input
        type="email"
        name="email"
        value={email}
        onChange={handleChange}
        className="form-input email-input"
        placeholder="Email Id"
      />
      <input
        type="password"
        name="password"
        value={password}
        onChange={handleChange}
        className="form-input v-pass-input"
        placeholder="Confirm Password"
      />
      <button className="add-form-btn">Login</button>
    </form>
  )
}

export default Login
