import React, { Component } from 'react';
import { Row, Col } from 'antd';
import LeftMenu from '../general/menuSidebar/LeftMenu';
import RightMenu from '../general/menuSidebar/RightMenu';
import NewsFeed from './NewsFeed';

class MainPage extends Component {
  render() {
    return (
      <div className="general-layout-row w-100">
        <Row>
          <Col span={6}>
            <LeftMenu />
          </Col>
          <Col span={12}>
            <NewsFeed />
          </Col>
          <Col span={6}>
            <RightMenu />
          </Col>
        </Row>
      </div>
    );
  }
}

export default MainPage;
