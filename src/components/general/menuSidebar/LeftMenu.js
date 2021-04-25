import React, { Component } from 'react';
import LeftMenuProfile from './LeftMenuProfile';
import CategoryMenuList from './CategoryMenuList';

class LeftMenu extends Component {
  render() {
    return (
      <div className="general-layout h-100 align-items-start justify-content-start left-menu">
        <LeftMenuProfile />
        <CategoryMenuList />
      </div>
    );
  }
}

export default LeftMenu;
