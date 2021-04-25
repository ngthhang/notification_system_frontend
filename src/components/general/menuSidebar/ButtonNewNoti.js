import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  Button,
} from 'antd';
import { Redirect } from 'react-router-dom';

const ButtonNewNoti = (props) => {
  const [redirect, enableRedirect] = useState(false);
  if (redirect) {
    return <Redirect to="/category/:id" />;
  }
  const { post } = props;
  const { name, aliasKey } = post.category;

  const redirectCategories = (key) => {
    enableRedirect(true);
    console.log(key);
  };

  return (
    <Button onClick={() => redirectCategories(aliasKey)} className="btn-menu-post general-layout flex-row w-100 align-items-center justify-content-start">
      <div className="general-layout justify-content-start align-items-start w-100 text-start text-wrap">
        <span className="category-noti-header">
          [
          {name}
          ]
          {' '}
          -
          {' '}
          <span className="post-created-text my-1">{post.createdAt}</span>
        </span>
        <span className="user-name ml-2">
          {post.header}
        </span>
        <span className="content-noti-text">{post.content}</span>
      </div>
    </Button>
  );
};

export default connect()(ButtonNewNoti);
