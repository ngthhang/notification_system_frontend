import React, { Component } from 'react';
import { Divider } from 'antd';
import NewPost from './NewPost';
import NewNotification from './NewNotification';

class RightMenu extends Component {
  render() {
    return (
      <div className="right-menu">
        <NewPost />
        <Divider type="horizontal" />
        <NewNotification />
      </div>
    );
  }
}

export default RightMenu;
