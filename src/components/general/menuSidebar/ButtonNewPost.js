import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  Button, Avatar,
} from 'antd';
import { Redirect } from 'react-router-dom';

const ButtonNewPost = (props) => {
  const [redirect, enableRedirect] = useState(false);
  if (redirect) {
    return <Redirect to="/category/:id" />;
  }
  const { post } = props;
  const { name, avatar } = post.student;

  const redirectCategories = (key) => {
    enableRedirect(true);
    console.log(key);
  };

  return (
    <Button onClick={() => redirectCategories(name)} className="btn-menu-post general-layout flex-row w-100 align-items-center justify-content-between">
      <Avatar
        src={avatar === '' ? 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png' : avatar}
        size={{
          xs: 24, sm: 32, md: 40, lg: 64, xl: 64, xxl: 64,
        }}
        shape="circle"
      />
      <div className="general-layout justify-content-start align-items-start w-75">
        <span className="text-start text-wrap ml-2">
          <span className="user-name">{name}</span>
          {' '}
          đã đăng
          {' '}
          {post.header}
        </span>
        <span className="post-created-text my-1">{post.createdAt}</span>
      </div>
    </Button>
  );
};

export default connect()(ButtonNewPost);
