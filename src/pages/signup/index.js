import React from 'react';
import { Layout } from 'antd';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Input, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons'

const { Header, Footer, Sider, Content } = Layout;

export default function SignUp() {
    const navigate = useNavigate();

    const handleSetLogin = (value) => {
        localStorage.setItem('isLogin', true);
        const users = localStorage.getItem('users');
        if(users != '')
            localStorage.setItem('users', JSON.stringify([...JSON.parse(users), value]))
        else localStorage.setItem('users', JSON.stringify(value))
        navigate('/');
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
            .required('Required'),
    });

    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <h1>Signup</h1>
            <Formik
                initialValues={{
                    userName: '',
                    email: '',
                    password: '',
                }}
                validationSchema={SignupSchema}
                onSubmit={values => {
                    // same shape as initial values
                    console.log(values);
                    handleSetLogin(values);
                }}
            >
                {({ errors, touched }) => (
                    <Form style={{ display: 'flex', flexDirection: 'column', width: '40vw', alignItems: 'center' }}>
                        <Field name="userName"
                            render={({ field }) => (
                                <Input
                                    type='userName'
                                    {...field}
                                    placeholder="Enter username" />
                            )}
                        />
                        {errors.userName && touched.userName ? (
                            <div>{errors.userName}</div>
                        ) : null}
                        <Field name="email"
                            render={({ field }) => (
                                <Input
                                    type='email'
                                    {...field}
                                    placeholder="Enter email" />
                            )}
                        />
                        {errors.email && touched.email ? <div>{errors.email}</div> : null}
                        <Field name="password"
                            render={({ field /* { name, value, onChange, onBlur } */ }) => (
                                <Input.Password
                                    {...field}
                                    placeholder="Enter password"
                                    iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                />
                            )}
                        />
                        {errors.password && touched.password ? <div>{errors.password}</div> : null}
                        <button type="submit">Submit</button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

