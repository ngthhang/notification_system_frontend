import React from 'react';
import { connect } from 'react-redux';
import { message } from 'antd';
import { Redirect } from 'react-router-dom';
import ListCategories from '../components/general/ListCategories';
import changeRedirect from '../actions/redirectFaculty';

const ListCategoriesScreen = ({ dispatch, currentUser }) => {
  dispatch(changeRedirect('list-categories'));
  const { token } = currentUser;
  if (!token && token === '') {
    message.error('Bạn chưa đăng nhập');
    return <Redirect to="/login" />;
  }
  return (
    <ListCategories />
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.currentUser,
});

export default connect(mapStateToProps)(ListCategoriesScreen);
