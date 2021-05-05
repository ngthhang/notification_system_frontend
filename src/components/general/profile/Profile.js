import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Row, Col, message } from 'antd';
import { Redirect } from 'react-router-dom';
import ProfileHeader from './ProfileHeader';
import ProfileAbout from './ProfileAbout';
import changeRedirect from '../../../actions/redirectFaculty';
import { findStudent } from '../../../services/student.service';

const Profile = ({ dispatch, role, id }) => {
  dispatch(changeRedirect('profile'));
  const [user, setUser] = useState({});
  const [userAva, setUserAva] = useState('');
  const [redirect, enableRedirect] = useState(false);
  const [position, setPosition] = useState('');

  useEffect(async () => {
    let data;
    switch (role) {
      case 'student':
        data = await findStudent(id);
        if (data.code === 0) {
          message.error(data.message);
          enableRedirect(true);
          break;
        }
        if (data.avatar.includes('public')) {
          const temp = data.avatar.split('/')[2];
          setUserAva(`https://webnc-final-backend.herokuapp.com/public/images/${temp}`);
        } else {
          setUserAva(data.avatar);
        }
        setUser(data);
        setPosition('Sinh viên');
        break;
      default:
        break;
    }
    return null;
  });

  if (redirect) {
    return <Redirect to="/" />;
  }
  return (
    <div className="general-layout justify-content-start w-100 h-100">
      <Row className="general-layout">
        <Col span={24}>
          <ProfileHeader name={user.display_name} avatar={userAva} position={position} />
          <ProfileAbout user={user} />
        </Col>
      </Row>
    </div>
  );
};

export default connect()(Profile);
