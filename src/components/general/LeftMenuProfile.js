import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  Button, Avatar,
} from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Redirect } from 'react-router-dom';

function LeftMenuProfile() {
  const [redirect, enableRedirect] = useState(false);
  if (redirect) {
    return (
      <Redirect to="/faculty/profile" />
    );
  }
  return (
    <Button onClick={() => enableRedirect(true)} className="general-layout btn-left-menu justify-content-start flex-row">
      <Avatar className="d-flex align-items-center justify-content-center header-avatar" icon={<UserOutlined />} />
      <span className="user-name mx-3">Khoa CNTT</span>
    </Button>
  );
}

export default connect()(LeftMenuProfile);
