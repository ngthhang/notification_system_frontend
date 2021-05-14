import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  Button, Divider,
} from 'antd';
import ButtonNewNoti from './ButtonNewNoti';
import { getAllNoti } from '../../../services/notification.service';

const NewNotification = ({ currentUser }) => {
  const [loading, setLoading] = useState(true);
  const [currentPage, setPage] = useState(1);
  const [notiList, setList] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  useEffect(async () => {
    console.log('after set page: ', currentPage);
    const res = await getAllNoti(currentPage);
    if (res.length <= 0) {
      setHasMore(false);
      setPage(currentPage - 1);
      return;
    }
    if (hasMore) {
      setList(notiList.concat(res));
      setLoading(false);
      console.log(res);
    }
  }, [currentPage]);

  if (loading) {
    return null;
  }

  const loadMoreNoti = async () => {
    console.log('current page before add noti: ', currentPage);
    setPage(currentPage + 1);
  };
  return (
    <div className="general-layout w-100 align-items-start">
      <div className="d-flex flex-row align-items-center justify-content-between w-100 my-2">
        <span className="header-text">Thông báo mới</span>
        <Button type="link" onClick={loadMoreNoti}>Xem thêm</Button>
      </div>
      <div className="noti-holder">
        {notiList.map((item) => (
          <>
            <ButtonNewNoti currentUser={currentUser} key={item._id} post={item} />
            <Divider type="horizontal" style={{ margin: '10px 0px' }} />
          </>
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  redirectCategories: state.redirectCategories,
});

export default connect(mapStateToProps)(NewNotification);
