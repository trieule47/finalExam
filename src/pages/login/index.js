import React, { useState } from 'react'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { Input, Button, message } from 'antd'
import { useNavigate } from 'react-router-dom'
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons'
import ModalApp from '../../components/modal'
import Message from '../../components/message'
import './login.css'
const key = 'updatable'

const ValidationSchemaExample = (props) => {
  const navigate = useNavigate()
  const [users, setUsers] = useState('');

  const getUsers = async () => {
    setUsers(JSON.parse(localStorage.getItem('users')));
    console.log('users');
    console.log(users);
    return JSON.parse(localStorage.getItem('users'));
  }
  const handleLogin = async (user) => {
    const us = await getUsers();
    if (user.username == 'admin' && user.password == 'admin' || us.find((e) =>
      e.username == user.username && e.password == user.password
    )) {
      openMessage()
      localStorage.setItem('isLogin', true)
      navigate('/');
    } else {
      alert('sign in error! try another account');
    }
  }

  const openMessage = () => {
    message.loading({
      content: 'Loading...',
      key
    })
    setTimeout(() => {
      message.success({
        content: 'Đăng nhập thành công!',
        key,
        duration: 1
      })
    }, 1000)
  }

  const SignupSchema = Yup.object().shape({
    username: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    // email: Yup.string().email('Invalid email').required('Required'),
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
      <h1>LOGIN</h1>
      <Formik
        initialValues={{
          username: '',
          password: ''
        }}
        validationSchema={SignupSchema}
        onSubmit={values => {
          // same shape as initial values
          console.log(values)
          handleLogin(values)
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
            <button className='btn' type="submit">Login</button>
            <button className='btn' type="submit" onClick={() => navigate('/signup')}>SignUp</button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default ValidationSchemaExample
