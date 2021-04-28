import React from 'react';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import EditComment from './EditComment';

const currentUser = {
  name: 'Nguyen Thuy Hang',
  id: '123',
  avatar: '',
};

const UserComment = ({ user, content }) => (
  <div className="card-noti-comment">
    <Avatar className="d-flex align-items-center justify-content-center header-avatar" icon={<UserOutlined />} />
    <div className="content-holder">
      <div className="content">
        <span className="d-flex align-items-center justify-content-center text-wrap user-name">
          {user.name}
          {' '}
          {user.role === 'faculty' ? (<span className="user-comment-tag mx-1">phòng/khoa</span>) : ''}
        </span>
        <span className="text-wrap">{content}</span>
      </div>
      {currentUser.id === user.id ? (
        <EditComment content={content} />
      ) : null}
    </div>
  </div>
);

export default UserComment;
