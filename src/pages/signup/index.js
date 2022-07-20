import React,{useState} from 'react'
import { Layout } from 'antd'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { Input, Button, message } from 'antd'
import { useNavigate } from 'react-router-dom'
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons'
import './signup.css'
const { Header, Footer, Sider, Content } = Layout
const key = 'updatable'

export default function SignUp(props) {
  const navigate = useNavigate()
  
  function handleSignUp(user) {
    var userList = JSON.parse(localStorage.getItem('users'))
    if(userList != null) {
      userList = [...userList, user]
    } else{
      userList = [user]
    }
    localStorage.setItem('users', JSON.stringify(userList))
    openMessage()
    navigate('/login');
  }

  const openMessage = () => {
    message.loading({
      content: 'Loading...',
      key
    })
    setTimeout(() => {
      message.success({
        content: 'Đăng ký thành công!',
        key,
        duration: 2
      })
    }, 1000)
  }

  const SignupSchema = Yup.object().shape({
    username: Yup.string()
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
      className={props.theme}
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '90vh'
      }}
    >
      <h1>Signup</h1>
      <Formik
        initialValues={{
          username: '',
          email: '',
          password: ''
        }}
        validationSchema={SignupSchema}
        onSubmit={values => {
          // same shape as initial values
          console.log(values)
          handleSignUp(values)
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
              name="username"
              render={({ field }) => (
                <Input
                  type="username"
                  {...field}
                  placeholder="Enter username"
                />
              )}
            />
            {errors.username && touched.username ? (
              <div>{errors.username}</div>
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
            <button className='btn' type="submit">Sign up</button>
            <button className='btn' type="submit" onClick={() => {navigate('/login')}}>Login</button>
          </Form>
        )}
      </Formik>
    </div>
  )
}
