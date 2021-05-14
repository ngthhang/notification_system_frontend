import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { message } from 'antd';
import AddAccount from '../components/admin/AddAccount';

const AdminScreen = ({ currentUser }) => {
  const { token } = currentUser;
  if (token === null && token === '') {
    message.error('Bạn chưa đăng nhập');
    return <Redirect to="/login" />;
  }
  return (
    <AddAccount />
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.currentUser,
});

export default connect(mapStateToProps)(AdminScreen);
