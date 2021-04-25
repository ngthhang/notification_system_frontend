import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  Button, Avatar,
} from 'antd';
import { Redirect } from 'react-router-dom';
import colorArray from '../../../utils/colorArray';

const MenuButtonCategory = (props) => {
  const [redirect, enableRedirect] = useState(false);
  if (redirect) {
    return <Redirect to="/category/:id" />;
  }
  const { aliasKey, name } = props;

  const redirectCategories = (key) => {
    enableRedirect(true);
    console.log(key);
  };

  return (
    <Button onClick={() => redirectCategories(aliasKey)} className="btn-left-menu-category general-layout flex-row w-100 align-items-center justify-content-between">
      <Avatar
        style={{
          backgroundColor: colorArray[Math.floor(Math.random() * colorArray.length)],
          verticalAlign: 'middle',
        }}
        shape="square"
        size="large"
      >
        C
      </Avatar>
      <span className="user-name w-75 text-wrap text-start mx-3">{name}</span>
    </Button>
  );
};

export default connect()(MenuButtonCategory);
