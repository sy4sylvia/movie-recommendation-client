import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';

import { LockOutlined, UserOutlined } from '@ant-design/icons';

import 'antd/dist/antd.css';


const Login = () => {
    const onFinish = (values) => {
        console.log('Received values of form: ', values);
    };
    return (
        <Form
            name='normal_login'
            className='login-form'
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
        >
            <Form.Item
                name='email'
                rules={[
                    {
                        required: true,
                        message: 'Please input your email',
                    },
                ]}
            >
                <Input
                    prefix={<UserOutlined className='site-form-item-icon' />}
                    placeholder='Email' />
            </Form.Item>
            <Form.Item
                name='password'
                rules={[
                    {
                        required: true,
                        message: 'Please input your password',
                    },
                ]}
            >
                <Input
                    prefix={<LockOutlined className='ite-form-item-icon' />}
                    type='password'
                    placeholder='Password'
                />
            </Form.Item>
            <Form.Item>
                <Form.Item name='remember' valuePropName='checked' noStyle>
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>
                {/*TODO: change the href later*/}
                <a className='login-form-forgot' href='http://localhost:3000/forgot-password'>
                    Forgot password
                </a>
            </Form.Item>

            <Form.Item>
                <Button type='primary' htmlType='submit' className='login-form-button'>
                    Log in
                </Button>
                Or
                <a href='http://localhost:3000/register'>register now!</a>
            </Form.Item>
        </Form>
    );
};

export default Login;