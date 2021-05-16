import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  Button, Avatar,
} from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Redirect } from 'react-router-dom';
import { findStudent } from '../../../services/student.service';
import url from '../../../utils/route';

function LeftMenuProfile() {
  const [redirect, enableRedirect] = useState(false);
  const [userId, setUserId] = useState('');
  const [role, setRole] = useState('');
  const [user, setUser] = useState('');

  useEffect(async () => {
    const currentRole = localStorage.getItem('role');
    const currentUserID = localStorage.getItem('user');
    setUserId(currentUserID);
    setRole(currentRole);
    if (currentRole === 'student') {
      const data = await findStudent(currentUserID);
      if (data.avatar.includes('public')) {
        data.avatar = `${url}${data.avatar}`;
      }
      setUser(data);
    }
  }, []);

  if (redirect) {
    return (
      <Redirect to={`/profile/${role}/${userId}`} />
    );
  }
  if (role === 'student') {
    return (
      <Button onClick={() => enableRedirect(true)} className="general-layout btn-left-menu justify-content-start flex-row">
        <Avatar className="d-flex align-items-center justify-content-center header-avatar" src={user.avatar} icon={<UserOutlined />} />
        <span className="user-name mx-3">{user.display_name}</span>
      </Button>
    );
  }
  return null;
}

export default connect()(LeftMenuProfile);
