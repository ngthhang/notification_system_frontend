import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  Button, Avatar,
} from 'antd';
import { Redirect } from 'react-router-dom';
import colorArray from '../../../utils/colorArray';

const MenuButtonCategory = ({ aliasKey, name }) => {
  const [redirect, enableRedirect] = useState(false);
  if (redirect) {
    return <Redirect to={`/categories/${aliasKey}`} />;
  }

  return (
    <Button onClick={() => enableRedirect(true)} className="btn-left-menu-category general-layout flex-row w-100 align-items-center justify-content-between">
      <Avatar
        style={{
          backgroundColor: colorArray[Math.floor(Math.random() * colorArray.length)],
          verticalAlign: 'middle',
        }}
        shape="square"
        size="large"
      >
        {aliasKey}
      </Avatar>
      <span className="user-name w-75 text-wrap text-start mx-3">{name}</span>
    </Button>
  );
};

export default connect()(MenuButtonCategory);
