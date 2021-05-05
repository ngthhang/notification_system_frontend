import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { message } from 'antd';
import AddAccount from '../components/admin/AddAccount';
import AdvanceHeader from '../components/general/AdvanceHeader';
import Footer from '../components/general/Footer';

const AdminScreen = ({ currentUser }) => {
  const { token } = currentUser;
  if (token === null && token === '') {
    message.error('Bạn chưa đăng nhập');
    return <Redirect to="/login" />;
  }
  return (
    <div className="general-screen">
      <AdvanceHeader />
      <AddAccount />
      <Footer />
    </div>
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.currentUser,
});

export default connect(mapStateToProps)(AdminScreen);
