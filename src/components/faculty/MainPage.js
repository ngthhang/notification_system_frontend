import React, { useState, useEffect } from 'react';
import {
  Row, Col, Spin, Tabs,
} from 'antd';
import { connect } from 'react-redux';
import { LoadingOutlined } from '@ant-design/icons';
import LeftMenu from '../general/menuSidebar/LeftMenu';
import RightMenu from '../general/menuSidebar/RightMenu';
import NewsFeed from './NewsFeed';
import changeRedirect from '../../actions/redirectFaculty';
import { getUser } from '../../services/user.service';
import { findStudent } from '../../services/student.service';
import AdvanceHeader from '../general/AdvanceHeader';
import Footer from '../general/Footer';

const { TabPane } = Tabs;
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const MainPage = ({ dispatch }) => {
  const currentUserRole = localStorage.getItem('role');
  const currentUserId = localStorage.getItem('user');
  const [currentUser, setCurrentUser] = useState({});
  const [height, setHeight] = useState(true);
  const [showNewsfeed, setShowNewsfeed] = useState(true);
  const [showCate, setShowCate] = useState(false);
  const [showNoti, setShowNoti] = useState(false);
  const [showLargeNoti, setShowLargeNoti] = useState(true);
  const [showLargeCate, setShowLargeCate] = useState(false);
  const [loading, setLoading] = useState(true);
  let dataCurrentUser;
  dispatch(changeRedirect('newsfeed'));
  useEffect(async () => {
    switch (currentUserRole) {
      case 'student':
        dataCurrentUser = await findStudent(currentUserId);
        break;
      case 'faculty':
        dataCurrentUser = await getUser(currentUserId);
        break;
      case 'admin':
        dataCurrentUser = await getUser(currentUserId);
        break;
      default:
        break;
    }
    setCurrentUser(dataCurrentUser);
    setLoading(false);
  }, [showNewsfeed, showLargeCate]);

  if (loading) {
    return (
      <div className="general-screen h-100">
        <AdvanceHeader />
        <div className="general-layout-row h-100 w-100 mt-3">
          <Spin indicator={antIcon} />
        </div>
        <Footer />
      </div>
    );
  }

  setTimeout(() => setHeight(false),
    2000);

  const onChangeMobile = (key) => {
    switch (key) {
      case '1':
        setShowNoti(false);
        setShowCate(true);
        setShowNewsfeed(false);

        break;
      case '2':
        setShowNoti(false);
        setShowCate(false);
        setShowNewsfeed(true);
        break;
      case '3':
        setShowNoti(true);
        setShowCate(false);
        setShowNewsfeed(false);
        break;
      default:
        break;
    }
  };

  const onChangeLarge = (key) => {
    switch (key) {
      case '1':
        setShowLargeCate(true);
        setShowLargeNoti(false);
        break;
      case '2':
        setShowLargeCate(false);
        setShowLargeNoti(true);
        break;
      default:
        break;
    }
  };

  return (
    <div className={`general-screen justify-content-start w-100 ${height ? 'h-100' : ''}`}>
      <AdvanceHeader />
      <Row className="general-layout mt-3 w-100 h-100">
        <Col span={24} xs={24} lg={0} xxl={0} xl={0} md={24} sm={24} className="w-100 h-100">
          <Tabs defaultActiveKey="2" className="general-layout w-100 h-100" onChange={onChangeMobile} size="large">
            <TabPane tab="Chuyên mục" key="1" className="w-100 h-100" />
            <TabPane tab="Bảng tin" key="2" className="w-100 h-100" />
            <TabPane tab="Thông báo mới" key="3" className="w-100 h-100" />
          </Tabs>
        </Col>
        <Col span={0} xs={0} lg={24} xxl={0} xl={0} md={0} sm={0}>
          <Tabs defaultActiveKey="2" className="general-layout w-100 h-100" onChange={onChangeLarge} size="large">
            <TabPane tab="Chuyên mục" key="1" className="w-100 h-100" />
            <TabPane tab="Bảng tin" key="2" className="w-100 h-100" />
          </Tabs>
        </Col>
      </Row>
      <div className="general-layout-row w-100 mt-3">
        <Row className="w-100">
          <Col span={showCate ? 24 : 0} xs={showCate ? 24 : 0} lg={showLargeCate ? 24 : 0} xxl={6} xl={6} md={showCate ? 24 : 0} sm={showCate ? 24 : 0}>
            <LeftMenu currentUser={currentUser} />
          </Col>
          <Col span={showNewsfeed ? 24 : 0} xs={0} lg={showLargeNoti ? 16 : 0} xxl={12} xl={12} md={showNewsfeed ? 24 : 0} sm={showNewsfeed ? 24 : 0}>
            <NewsFeed currentUser={currentUser} />
          </Col>
          <Col span={showNoti ? 24 : 0} xs={0} lg={showLargeNoti ? 8 : 0} xxl={6} xl={6} md={showNoti ? 24 : 0} sm={showNoti ? 24 : 0}>
            <RightMenu currentUser={currentUser} />
          </Col>
        </Row>
      </div>
      <Footer />
    </div>
  );
};

export default connect()(MainPage);
