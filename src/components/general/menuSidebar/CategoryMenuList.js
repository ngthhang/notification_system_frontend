import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {
  Button,
} from 'antd';
import MenuButtonCategory from './MenuButtonCategory';
import changeRedirect from '../../../actions/redirectFaculty';
import { getAllCategories } from '../../../services/categories.service';

const CategoryMenuList = ({ dispatch }) => {
  const [redirect, enableRedirect] = useState(false);
  const [listCategories, setListCategories] = useState([]);

  useEffect(async () => {
    const res = await getAllCategories();
    setListCategories(res);
    console.log(res);
  }, []);

  if (redirect) {
    return <Redirect to="/categories" />;
  }

  const redirectToAllCategories = () => {
    enableRedirect(true);
    dispatch(changeRedirect('categories'));
  };

  return (
    <div className="general-layout w-100 align-items-start">
      <div className="d-flex flex-row align-items-center justify-content-between w-100 my-2">
        <span className="header-text">Chuyên mục</span>
        <Button type="link" onClick={redirectToAllCategories}>Xem tất cả</Button>
      </div>
      {listCategories && listCategories.length > 0 && listCategories.map((item) => (
        <MenuButtonCategory key={item._id} id={item._id} name={item.name} aliasKey={item.alias_key} />
      ))}

    </div>
  );
};

const mapStateToProps = (state) => ({
  redirectCategories: state.redirectCategories,
});

export default connect(mapStateToProps)(CategoryMenuList);
