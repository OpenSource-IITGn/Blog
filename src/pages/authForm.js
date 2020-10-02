import { Col, Row } from 'antd'
import React from 'react'
import Login from '../components/forms/login'
import SignUp from '../components/forms/signup'

function AuthForm({ isLogin }) {
  const form = isLogin ? <Login /> : <SignUp />
  return (
    <main className="home">
      <section className="container">
        <div className="row">
          <Row>
            <Col lg={17} md={24}>
              <div className="auth-form">{form}</div>
            </Col>
          </Row>
        </div>
      </section>
    </main>
  )
}

export default AuthForm
