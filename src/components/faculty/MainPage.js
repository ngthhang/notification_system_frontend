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
    <div className="general-layout-row w-100 mt-3" id="header">
      <Row className="w-100">
        <Col span={0} xs={0} lg={0} xxl={6} xl={6} md={0} sm={0}>
          <LeftMenu />
        </Col>
        <Col span={12} xs={24} lg={16} xxl={12} xl={12} md={24} sm={24}>
          <NewsFeed />
        </Col>
        <Col span={6} xs={0} lg={8} xxl={6} xl={6} md={0} sm={0}>
          <RightMenu />
        </Col>
      </Row>
    </div>
  );
};

export default connect()(MainPage);
