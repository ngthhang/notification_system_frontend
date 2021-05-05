import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { message } from 'antd';
import MainPage from '../components/faculty/MainPage';
import AdvanceHeader from '../components/general/AdvanceHeader';
import Footer from '../components/general/Footer';
import { auth } from '../services/auth.service';

const NewsFeedScreen = () => {
  if (!auth()) {
    message.error('Bạn chưa đăng nhập');
    return <Redirect to="/login" />;
  }
  return (
    <div className="general-screen">
      <AdvanceHeader />
      <MainPage />
      <Footer />
    </div>
  );
};
export default connect()(NewsFeedScreen);
