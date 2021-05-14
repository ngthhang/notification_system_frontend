import React, { Component } from 'react';
import LeftMenuProfile from './LeftMenuProfile';
import CategoryMenuList from './CategoryMenuList';

class LeftMenu extends Component {
  render() {
    return (
      <div className="left-menu w-100">
        <LeftMenuProfile />
        <CategoryMenuList />
      </div>
    );
  }
}

export default LeftMenu;
