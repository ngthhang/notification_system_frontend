import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {
  Button, Divider,
} from 'antd';
import ButtonNewNoti from './ButtonNewNoti';
import { getAllNoti } from '../../../services/notification.service';

const NewNotification = ({ currentUser, notiUpdated }) => {
  const [loading, setLoading] = useState(true);
  const [redirect, setRedirect] = useState(false);
  const [notiList, setList] = useState([]);
  useEffect(async () => {
    const res = await getAllNoti(1);
    setList(res);
    setLoading(false);
  }, [notiUpdated]);

  if (loading) {
    return null;
  }

  if (redirect) {
    return <Redirect to="/noti/all" />;
  }

  return (
    <div className="general-layout w-100 align-items-start">
      <div className="d-flex flex-row align-items-center justify-content-between w-100 my-2">
        <span className="header-text">Thông báo mới</span>
        <Button type="link" onClick={() => setRedirect(true)}>Xem tất cả</Button>
      </div>
      <div className="noti-holder">
        {notiList.map((item) => (
          <div key={item._id}>
            <ButtonNewNoti currentUser={currentUser} post={item} />
            <Divider type="horizontal" style={{ margin: '10px 0px' }} />
          </div>
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  redirectCategories: state.redirectCategories,
  notiUpdated: state.updateNoti,
});

export default connect(mapStateToProps)(NewNotification);
