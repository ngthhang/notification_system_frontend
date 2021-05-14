import React, { useState } from 'react';
import { GoogleLogin } from 'react-google-login';
import { notification } from 'antd';
import { Redirect } from 'react-router-dom';
import { studentLogin } from '../services/student.service';

const GoogleLoginButton = () => {
  const [redirect, enableRedirect] = useState(false);

  const showStatus = (type, message) => {
    notification[type]({
      message,
      placement: 'bottomRight',
    });
  };

  const responseGoogle = async (response) => {
    const { tokenId, profileObj } = response;
    const { email } = profileObj;
    const isValid = email.includes('@student.tdtu.edu.vn');
    if (!isValid) {
      showStatus('error', 'Email không hợp lệ');
      return;
    }

    try {
      const res = await studentLogin({ token: tokenId });
      const { code } = res.data;
      if (code === 0) {
        showStatus('error', res.data.message);
        return;
      }
      const { token, user } = res.data;
      const { student_id } = user;
      showStatus('success', 'Đăng nhập thành công');
      localStorage.setItem('token', token);
      localStorage.setItem('user', student_id);
      localStorage.setItem('role', 'student');
      enableRedirect(true);
    } catch (e) {
      console.log(e);
      showStatus('error', 'Đăng nhập thất bại');
    }
  };

  if (redirect) {
    return <Redirect to="/" />;
  }

  return (
    <GoogleLogin
      className="w-100 d-flex align-items-center justify-content-center"
      clientId="1052910127906-2aodssbvnr6mse6q5it9961tbkqj5scb.apps.googleusercontent.com"
      buttonText="Đăng nhập với Google"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy="single_host_origin"
    />
  );
};

export default GoogleLoginButton;
