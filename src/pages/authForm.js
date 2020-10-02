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
          <Row justify="center" align="middle">
            <Col lg={14} md={18}>
              {form}
            </Col>
          </Row>
        </div>
      </section>
    </main>
  )
}

export default AuthForm
