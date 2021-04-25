import React, { Component } from 'react';
import { Divider } from 'antd';
import NewPost from './NewPost';
import NewNotification from './NewNotification';

class RightMenu extends Component {
  render() {
    return (
      <div className="general-layout h-100 align-items-start justify-content-start left-menu">
        <NewPost />
        <Divider type="horizontal" />
        <NewNotification />
      </div>
    );
  }
}

export default RightMenu;
