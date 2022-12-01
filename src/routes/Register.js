import React from 'react';
import { Button, Form, Input, Card } from 'antd';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

import 'antd/dist/antd.css';
import '../App.css';

const Register = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const submitRegisterForm = (values) => {
        delete values.password2;

        console.log(values);

        axios.post('/register', values)
            .then(function (response) {
                console.log(response.data);
                if (response.status === 200) {
                    const myUserId = response.data.userId;
                    localStorage.setItem('myUserId', myUserId);
                    navigate('/login');
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
            title='Register'
        >
            <Form
                className='form-inside-card'
                form={form}
                layout='vertical'
                onFinish={submitRegisterForm}
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

                <Form.Item
                    label='Confirm Password'
                    name='password2'
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Please confirm your password.'
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(
                                    new Error('Passwords do not match!'));
                            },
                        }),
                    ]}
                >
                    <Input.Password />
                </Form.Item>


                <Form.Item>
                    <Button type='primary' htmlType='submit'>
                        Register
                    </Button>
                </Form.Item>

            </Form>
        </Card>
    );
};

export default Register;
