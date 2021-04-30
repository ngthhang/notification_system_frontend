import React from 'react';
import { Row, Col } from 'antd';
import { connect } from 'react-redux';
import LeftMenu from '../general/menuSidebar/LeftMenu';
import RightMenu from '../general/menuSidebar/RightMenu';
import NewsFeed from './NewsFeed';
import changeRedirect from '../../actions/redirectFaculty';

const MainPage = ({ dispatch }) => {
  dispatch(changeRedirect('newsfeed'));
  return (
    <div className="general-layout-row w-100 mt-3">
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
};

export default connect()(MainPage);
