import React, { Component } from 'react';
import LeftMenu from '../general/menuSidebar/LeftMenu';
import RightMenu from '../general/menuSidebar/RightMenu';
import NewsFeed from './NewsFeed';

class MainPage extends Component {
  render() {
    return (
      <div className="general-layout-row w-100 h-100">
        <LeftMenu />
        <NewsFeed />
        <RightMenu />
      </div>
    );
  }
}

export default MainPage;
