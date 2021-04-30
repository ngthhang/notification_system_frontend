import React from 'react';
import {
  Row, Col, Divider, Button,
} from 'antd';
import ProfileListDetail from './ProfileListDetail';
import ProfileListPost from './ProfileListPost';

const ProfileAbout = () => {
  const faculty = 'Khoa Công nghệ thông tin';
  const studentId = '51800378';
  const email = '51800378@student.tdtu.edu.vn';
  const isCurrentUser = true;
  return (
    <>
      <Row className="align-items-start w-100 h-100 py-4">
        <Col offset={1} span={7} className=" w-100 profile-about bg-white p-4">
          <span className="header">Giới thiệu</span>
          <Divider type="horizontal" />
          <ProfileListDetail faculty={faculty} studentId={studentId} email={email} />
          {isCurrentUser ? <Button className="btn-change-avatar">Chỉnh sửa ảnh đại diện</Button> : null}
        </Col>
        <Col offset={1} span={14}>
          <ProfileListPost />
        </Col>
      </Row>
    </>
  );
};

export default ProfileAbout;
