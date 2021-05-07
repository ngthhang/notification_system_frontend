import React from 'react';
import { connect } from 'react-redux';
import { message } from 'antd';
import { Redirect } from 'react-router-dom';
import ListCategories from '../components/general/ListCategories';
import changeRedirect from '../actions/redirectFaculty';
import AdvanceHeader from '../components/general/AdvanceHeader';
import Footer from '../components/general/Footer';

const ListCategoriesScreen = ({ dispatch, currentUser }) => {
  dispatch(changeRedirect('list-categories'));
  const { token } = currentUser;
  if (!token && token === '') {
    message.error('Bạn chưa đăng nhập');
    return <Redirect to="/login" />;
  }
  return (
    <div className="general-layout">
      <AdvanceHeader />
      <ListCategories />
      <Footer />
    </div>
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.currentUser,
});

export default connect(mapStateToProps)(ListCategoriesScreen);
