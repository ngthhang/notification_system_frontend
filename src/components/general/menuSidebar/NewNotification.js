import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {
  Button, Divider,
} from 'antd';
import ButtonNewNoti from './ButtonNewNoti';

const newNotiList = [
  {
    id: 'afsdfahjj',
    header: 'kết quả đăng ký môn học HK1 2020',
    content: 'Thân gửi các em học sinh Thân gửi các em học sinh Thân gửi các em học sinh ',
    category: {
      name: 'Phòng công tác học sinh sinh viên',
      aliasKey: 'CTHSSV',
    },
    createdAt: '25/04/2021 11:00 AM',
  },
  {
    id: 'afsdfahjj',
    header: 'kết quả đăng ký môn học HK1 2020',
    content: 'ádfjkhaksèyhaiet....',
    category: {
      name: 'Khoa Cong nghe thong tin',
      aliasKey: 'CTHSSV',
    },
    createdAt: '25/04/2021 11:00 AM',
  },
  {
    id: 'afsdfahtrudshjrjj',
    header: 'kết quả đăng ký môn học HK1 2020',
    content: 'ádfjkhaksèyhaiet',
    category: {
      name: 'Phòng công tác học sinh sinh viên',
      aliasKey: 'CTHSSV',
    },
    createdAt: '25/04/2021 11:00 AM',
  },
  {
    id: 'afsdfadhsthstrahjj',
    header: 'kết quả đăng ký môn học HK1 2020',
    content: 'ádfjkhaksèyhaiet',
    category: {
      name: 'Phòng công tác học sinh sinh viên',
      aliasKey: 'CTHSSV',
    },
    createdAt: '25/04/2021 11:00 AM',
  },
];

const NewNotification = () => {
  const [redirect, enableRedirect] = useState(false);
  if (redirect) {
    return (
      <Redirect to="/category/:id" />
    );
  }

  const redirectToAllCategories = () => {
    enableRedirect(true);
    console.log('hello');
  };
  return (
    <div className="general-layout w-100 align-items-start">
      <div className="d-flex flex-row align-items-center justify-content-between w-100 my-2">
        <span className="header-text">Thông báo mới</span>
        <Button type="link" onClick={redirectToAllCategories}>Xem tất cả</Button>
      </div>
      <div className="noti-holder">
        {newNotiList.map((item) => (
          <>
            <ButtonNewNoti key={item.id} post={item} />
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
