import React from 'react';
import { Redirect } from 'react-router-dom';
import { message } from 'antd';
import CardNoti from '../components/noti-detail/CardNoti';
import ListNoti from '../components/noti-detail/ListNoti';
import { auth } from '../services/auth.service';

const NotiDetailScreen = ({ match }) => {
  const { id } = match.params;
  if (!auth()) {
    message.error('Bạn chưa đăng nhập');
    return <Redirect to="/login" />;
  }

  if (id === 'all') {
    return <ListNoti />;
  }
  return (
    <CardNoti id={id} />
  );
};

export default NotiDetailScreen;
