import React from 'react';
import { Row, Col, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
// import getImage from '../../../services/image.service';

const ProfileHeader = ({ name, position, avatar }) => (
  <Row className="general-layout w-100 bg-header py-5">
    <Col span={22} className="w-100 general-layout-row justify-content-start">
      <Avatar icon={<UserOutlined />} src={avatar} size={75} className="general-layout" />
      <div className="general-layout align-items-start h-100 mx-4">
        <span className="profile-name">{name}</span>
        <span className="profile-role mt-2">{position}</span>
      </div>
    </Col>
  </Row>
);

export default ProfileHeader;
