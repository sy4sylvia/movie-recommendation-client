import React from 'react';
import { Button, Form, Input, Card } from 'antd';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

import 'antd/dist/antd.css';
import '../App.css';

const Login = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const submitLoginForm = (values) => {
        console.log(values);

        axios.post('/login', values)
            .then(function (response) {
                console.log(response);
                // response.data contains: customerId, firstName, lastName
                if (response.status === 200) {
                    navigate('/');
                }
            })
            .catch(function (error) {
                if (error.response.status === 401) {
                    alert('Wrong password.');
                } else {
                    alert(error);
                }
            });
    }

    return (
        <Card
            className='card-form-wrapper'
            title='Log In'
        >
            <Form
                className='form-inside-card'
                form={form}
                layout='vertical'
                onFinish={submitLoginForm}
                initialValues={{
                    modifier: 'public',
                }}
            >
                <Form.Item
                    label='Email'
                    name='email'
                    rules={[
                        {
                            required: true,
                            message: 'Please input your email.'
                        }
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label='Password'
                    name='password'
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password.'
                        }
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item>
                    <Button type='primary' htmlType='submit'>
                        Log In
                    </Button>
                </Form.Item>

            </Form>
        </Card>
    );
};

export default Login;
