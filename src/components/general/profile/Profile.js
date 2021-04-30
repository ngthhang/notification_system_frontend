import React from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'antd';
import ProfileHeader from './ProfileHeader';
import ProfileAbout from './ProfileAbout';
import changeRedirect from '../../../actions/redirectFaculty';

const Profile = ({ dispatch }) => {
  dispatch(changeRedirect('profile'));
  return (
    <div className="general-layout justify-content-start w-100 h-100">
      <Row className="general-layout">
        <Col span={24}>
          <ProfileHeader />
          <ProfileAbout />
        </Col>
      </Row>
    </div>
  );
};

export default connect()(Profile);
