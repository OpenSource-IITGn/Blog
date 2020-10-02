import React, { useState } from 'react'
import { useHistory } from 'react-router'
import { useSignupMutation } from '../../graphql/mutations/authMutations'

function SignUp() {
  const history = useHistory()
  const [signupMutation, signupMutationResults] = useSignupMutation()
  const [formState, setFormState] = useState(() => ({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    v_password: '',
  }))

  const { first_name, last_name, password, email, v_password } = formState

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
      const data = await signupMutation(first_name, last_name, email, password)
      const response = data.data.signUp
      if (response.ok) {
        history.push('/login')
      } else {
        history.push('/signup')
      }
    } catch (e) {
      console.log('Network or server Error')
    }
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <div className="form-head">Signup</div>
      <div className="input-group">
        <input
          type="text"
          name="first_name"
          value={first_name}
          onChange={handleChange}
          className="form-input name-input"
          placeholder="First Name"
        />
        <input
          type="text"
          name="last_name"
          value={last_name}
          onChange={handleChange}
          className="form-input last-name-input"
          placeholder="Last Name"
        />
      </div>
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
        className="form-input form-inpupass-input"
        placeholder="Password"
      />
      <input
        type="password"
        name="v_password"
        value={v_password}
        onChange={handleChange}
        className="form-input v-pass-input"
        placeholder="Confirm Password"
      />
      <button className="add-form-btn">Sign up</button>
    </form>
  )
}

export default SignUp
