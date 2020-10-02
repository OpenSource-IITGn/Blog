import React from 'react'

function Login() {
  return (
    <form className="auth-form">
      <div className="form-head">Login</div>
      <input type="email" className="form-input email-input" placeholder="Email Id" />
      <input type="password" className="form-input v-pass-input" placeholder="Confirm Password" />
      <button className="add-form-btn">Login</button>
    </form>
  )
}

export default Login
