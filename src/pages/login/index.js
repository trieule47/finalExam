import React from 'react'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { Input, Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons'
import ModalApp from '../../components/modal'
import Message from '../../components/message'

const ValidationSchemaExample = () => {
  const navigate = useNavigate()

  const handleSetLogin = () => {
    localStorage.setItem('isLogin', true)
    navigate('/')
  }

  const SignupSchema = Yup.object().shape({
    userName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required')
  })

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
      }}
    >
      <h1>Signup</h1>
      <Formik
        initialValues={{
          userName: '',
          email: '',
          password: ''
        }}
        validationSchema={SignupSchema}
        onSubmit={values => {
          // same shape as initial values
          console.log(values)
          handleSetLogin()
        }}
      >
        {({ errors, touched }) => (
          <Form
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '40vw',
              alignItems: 'center'
            }}
          >
            <Field
              name="userName"
              render={({ field }) => (
                <Input
                  type="userName"
                  {...field}
                  placeholder="Enter username"
                />
              )}
            />
            {errors.userName && touched.userName ? (
              <div>{errors.userName}</div>
            ) : null}
            <Field
              name="email"
              render={({ field }) => (
                <Input type="email" {...field} placeholder="Enter email" />
              )}
            />
            {errors.email && touched.email ? <div>{errors.email}</div> : null}
            <Field
              name="password"
              render={({ field /* { name, value, onChange, onBlur } */ }) => (
                <Input.Password
                  {...field}
                  placeholder="Enter password"
                  iconRender={visible =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                />
              )}
            />
            {errors.password && touched.password ? (
              <div>{errors.password}</div>
            ) : null}
            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
      <ModalApp />
      <Message />
    </div>
  )
}

export default ValidationSchemaExample
