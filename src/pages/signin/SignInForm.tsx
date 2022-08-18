
import React from 'react'
import styles from './SignInForm.module.css'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import { Link,useNavigate} from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector,useAppDispatch } from '../../redux/hooks';

import {Typography} from 'antd';
import { signIn } from '../../redux/user/slice';


export const SignInForm: React.FC = ()=>{
  const loading = useSelector(s => s.user.loading)
  const jwt = useSelector((s) => s.user.token)
  const error = useSelector((s) => s.user.error)
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => { 
    if(jwt !== null){navigate('/')};
   },[jwt])

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
    dispatch(signIn({
      email:values.username,
      password: values.password,
    }))
  };
  
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Form
      name="normal_login"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      className={styles['register-form']}
    >
      <Typography.Title>Sign in</Typography.Title>

      <Form.Item
        name="username"
        rules={[{ required: true, message: 'Please input your Username!' }]}
      >
        <Input prefix={<UserOutlined />} placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please input your Password!' }]}
      >
        <Input
          prefix={<LockOutlined />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <a className="login-form-forgot" href="">
          Forgot password
        </a>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Log in
        </Button>   
        &nbsp; Or &nbsp;  <Link to={'/register'}>register now!</Link>
      </Form.Item>
    </Form>
  );
};
