import React, { Component } from 'react';
import {
  Form, Input, Button, Divider,
} from 'antd';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { UserOutlined, LockOutlined, GoogleOutlined } from '@ant-design/icons';
import { enableRedirect } from '../actions/redirectLogin';

const getImg = () => {
  const tmp = require('../assets/images/logo.png');
  return tmp.default;
};

class LoginForm extends Component {
  static loginByGoogle() {
    console.log('hello');
  }

  onFinish = (values) => {
    const { dispatch } = this.props;
    console.log('Received values of form: ', values);
    const { username, password } = values;
    if (username === 'n' && password === '1') {
      dispatch(enableRedirect());
    }
  }

  render() {
    const { redirect } = this.props;
    if (redirect) {
      return <Redirect to="/" />;
    }
    return (
      <div className="d-flex flex-column align-items-center justify-content-center w-100 h-100">
        <div className="d-flex flex-column align-items-center justify-content-center col-lg-4 col-xl-4 col-xxl-3 col-md-8 col-sm-10 col-11 login-form-holder bg-white">
          <img src={getImg()} className="logo-img" alt="logo truong" />
          <h3 className="pt-5">Login</h3>
          <Form
            name="normal_login"
            className="login-form w-100 pt-5"
            initialValues={{ remember: true }}
            onFinish={this.onFinish}
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
              <Input
                className="py-2"
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button w-100 py-4 d-flex align-items-center justify-content-center">
                <span className="btn-text">Login</span>
              </Button>
            </Form.Item>
            <Divider plain>Or</Divider>
            <Form.Item>
              <Button danger onClick={this.loginByGoogle} icon={<GoogleOutlined />} className="login-form-button w-100 py-4 d-flex align-items-center justify-content-center">
                <span className="btn-text">Login by Google</span>
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  redirect: state.redirectLogin,
});

export default connect(mapStateToProps)(LoginForm);
