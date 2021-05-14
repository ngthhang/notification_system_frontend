import React, { useState } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import {
  Button, Skeleton,
} from 'antd';
import { Redirect } from 'react-router-dom';

const ButtonNewNoti = ({ post }) => {
  const [redirect, enableRedirect] = useState(false);
  const [loading, setLoading] = useState(true);
  const {
    _id, header, content, create_at, category,
  } = post;
  let name;
  if (category === null) {
    name = 'hello';
  } else {
    name = category.name;
  }
  if (redirect) {
    return <Redirect to={`/notify/${_id}`} />;
  }

  setTimeout(() => {
    setLoading(false);
  }, 2000);

  if (loading) {
    return <Skeleton active paragraphs={{ rows: 2 }} />;
  }

  const redirectNotifyDetail = () => {
    enableRedirect(true);
    console.log(post);
  };

  return (
    <Button key={_id} onClick={redirectNotifyDetail} className="btn-menu-post general-layout flex-row w-100 align-items-center justify-content-start">
      <div className="general-layout justify-content-start align-items-start w-100 text-start text-wrap">
        <span className="category-noti-header">
          [
          {name}
          ]
          {' '}
          -
          {' '}
          <span className="post-created-text my-1">{moment(create_at).format('DD/MM/YYYY hh:mm A')}</span>
        </span>
        <div className="general-layout-row w-100 align-items-center justify-content-between">
          <span className="user-name ml-2">
            {header}
          </span>
        </div>
        <span className="content-noti-text">{content}</span>
      </div>
    </Button>
  );
};

export default connect()(ButtonNewNoti);
