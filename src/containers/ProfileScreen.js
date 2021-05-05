import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { message } from 'antd';
import Profile from '../components/general/profile/Profile';
import AdvanceHeader from '../components/general/AdvanceHeader';
import Footer from '../components/general/Footer';
import { auth } from '../services/auth.service';

const ProfileScreen = ({ match }) => {
  const { role, id } = match.params;
  if (!auth()) {
    message.error('Bạn chưa đăng nhập');
    return <Redirect to="/login" />;
  }
  return (
    <div className="general-screen">
      <AdvanceHeader />
      <Profile role={role} id={id} />
      <Footer />
    </div>
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.currentUser,
});

export default connect(mapStateToProps)(ProfileScreen);
