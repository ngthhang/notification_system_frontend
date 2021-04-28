import React from 'react';
import { Avatar, Button } from 'antd';
import { UserOutlined, EllipsisOutlined } from '@ant-design/icons';

const NotiHeader = ({ poster, createdAt }) => {
  const { name } = poster;
  return (
    <div className="card-noti-header-holder">
      <div className="card-noti-poster">
        <Avatar
          size="large"
          className="d-flex align-items-center justify-content-center header-avatar"
          icon={<UserOutlined />}
        />
        <div className="user">
          <span className="user-name">{name}</span>
          <span className="create-time">{createdAt}</span>
        </div>
      </div>
      <Button icon={<EllipsisOutlined />} size="large" shape="circle" className="btn-more" />
    </div>
  );
};

export default NotiHeader;
