import React from 'react';
import { Row, Col, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const ProfileHeader = () => (
  <Row className="general-layout w-100 bg-header py-5">
    <Col span={22} className="w-100 general-layout-row justify-content-start">
      <Avatar icon={<UserOutlined />} size={75} className="general-layout" />
      <div className="general-layout align-items-start h-100 mx-4">
        <span className="profile-name">Nguyễn Thuý Hằng</span>
        <span className="profile-role mt-2">Sinh viên</span>
      </div>
    </Col>
  </Row>
);

export default ProfileHeader;
