
//session需要保存到服务器中，而session id要保存到前端的cookie中//到时候重写一次
import styles from "./RegisterForm.module.css";
import instance from '../../utils/axios/index'
import { useNavigate } from "react-router-dom";
import {  Button,
  Checkbox,
  Col,
  Form,
  Input,
  Row,
  Select,
  Typography
} from 'antd';
import React, { useState } from 'react';


const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

export const RegisterForm:React.FC = () => {
  const navigate = useNavigate();

  const [form] = Form.useForm();

  const onFinish = async (values) => {
    console.log('Received values of form: ', values);
    try{
      await instance.post('/auth/register',{
        email: values.username,
        password: values.password,
        confirmPassword: values.confirm,
      });
      alert('register successfully')
      navigate("/signIn/");
    } catch(error){
      alert('register failed')
    }
  };



  return (
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      scrollToFirstError
      className={styles["register-form"]}
    
    >

      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
          {
            required: true,
            message: 'Please input your E-mail!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }

              return Promise.reject(new Error('The two passwords that you entered do not match!'));
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>


        <Checkbox>
          I have read the <a href="">agreement</a>
        </Checkbox>

      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
    </Form>
  );
};

