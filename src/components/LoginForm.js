import React, { useState } from 'react';
import {
  Form, Input, Button, Divider, message,
} from 'antd';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  UserOutlined, LockOutlined, EyeTwoTone, EyeInvisibleOutlined,
} from '@ant-design/icons';
import { auth } from '../services/auth.service';
import { login } from '../services/user.service';
import GoogleLoginButton from './GoogleLoginButton';

const getImg = () => {
  const tmp = require('../assets/images/logo.png');
  return tmp.default;
};
const LoginForm = () => {
  const [redirect, enableRedirect] = useState(false);

  const onFinish = async (values) => {
    console.log('Received values of form: ', values);
    try {
      const res = await login(values);
      console.log(res);
      const { code } = res.data;
      const dataMessage = res.data.message;
      if (code === 0) {
        console.log('hello');
        return message.error(dataMessage);
      }
      const { user, token } = res.data;
      const { _id, role } = user;
      message.success('Đăng nhập thành công');
      localStorage.setItem('token', token);
      localStorage.setItem('user', _id);
      localStorage.setItem('role', role.toLowerCase());
      enableRedirect(true);
    } catch (e) {
      const m = e.message;
      message.error(m);
    }
    return 0;
  };

  if (redirect) {
    return <Redirect to="/" />;
  }

  if (!auth()) {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center w-100 py-5">
        <div className="d-flex flex-column align-items-center justify-content-center col-lg-4 col-xl-4 col-xxl-3 col-md-8 col-sm-10 col-11 login-form-holder bg-white">
          <img src={getImg()} className="logo-img" alt="logo truong" />
          <span className="pt-5 login-header-text">Sign In</span>
          <Form
            name="normal_login"
            className="login-form w-100 pt-5"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: 'Please input your Username!' }]}
            >
              <Input className="py-2" prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Please input your Password!' }]}
            >
              <Input.Password
                className="py-2"
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button w-100 py-4 d-flex align-items-center justify-content-center">
                <span className="btn-text">Log in</span>
              </Button>
            </Form.Item>
            <Divider plain>Or</Divider>
            <Form.Item>
              <GoogleLoginButton />
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
  return <Redirect to="/" />;
};

export default connect()(LoginForm);
