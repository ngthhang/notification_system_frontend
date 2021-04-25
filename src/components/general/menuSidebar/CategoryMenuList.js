import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {
  Button,
} from 'antd';
import MenuButtonCategory from './MenuButtonCategory';

const categoryList = [
  {
    id: 'CNTT',
    name: 'Khoa cong nghệ thông tin',
    aliasKey: 'CNTT',
  },
  {
    id: 'QTKD',
    name: 'Khoa Quản trị kinh doanh',
    aliasKey: 'QTKD',
  },
];

const CategoryMenuList = () => {
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
        <span className="header-text">Chuyên mục</span>
        <Button type="link" onClick={redirectToAllCategories}>Xem tất cả</Button>
      </div>
      {categoryList.map((item) => (
        <MenuButtonCategory key={item.id} name={item.name} aliasKey={item.aliasKey} />
      ))}

    </div>
  );
};

const mapStateToProps = (state) => ({
  redirectCategories: state.redirectCategories,
});

export default connect(mapStateToProps)(CategoryMenuList);
