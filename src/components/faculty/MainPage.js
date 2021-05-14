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
  }, []);

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

  return (
    <div className="general-screen w-100">
      <AdvanceHeader />
      <Row className="general-layout mt-3 w-100">
        <Col span={24} xs={24} lg={0} xxl={0} xl={0} md={24} sm={24} className="w-100">
          <Tabs defaultActiveKey="2" className="general-layout w-100" size="large">
            <TabPane tab="Chuyên mục" key="1" className="w-100 h-100">
              <LeftMenu currentUser={currentUser} />
            </TabPane>
            <TabPane tab="Bảng tin" key="2" className="w-100 h-100">
              <NewsFeed currentUser={currentUser} />
            </TabPane>
            <TabPane tab="Thông báo mới" key="3" className="w-100 h-100">
              <RightMenu currentUser={currentUser} />
            </TabPane>
          </Tabs>
        </Col>
        <Col span={0} xs={0} lg={24} xxl={0} xl={0} md={0} sm={0}>
          <Tabs defaultActiveKey="2" className="general-layout w-100" size="large">
            <TabPane tab="Chuyên mục" key="1" className="w-100">
              <LeftMenu currentUser={currentUser} />
            </TabPane>
            <TabPane tab="Bảng tin" key="2" className="w-100 h-100">
              <Row className="w-100 h-100">
                <Col span={0} xs={0} lg={16} xxl={0} xl={0} md={0} sm={0}>
                  <NewsFeed currentUser={currentUser} />
                </Col>
                <Col span={0} xs={0} lg={8} xxl={0} xl={0} md={0} sm={0}>
                  <RightMenu currentUser={currentUser} />
                </Col>
              </Row>
            </TabPane>
          </Tabs>
        </Col>
      </Row>
      <div className="general-layout-row w-100 mt-3">
        <Row className="w-100">
          <Col span={0} xs={0} lg={0} xxl={6} xl={6} md={0} sm={0}>
            <LeftMenu currentUser={currentUser} />
          </Col>
          <Col span={0} xs={0} lg={0} xxl={12} xl={12} md={0} sm={0}>
            <NewsFeed currentUser={currentUser} />
          </Col>
          <Col span={0} xs={0} lg={0} xxl={6} xl={6} md={0} sm={0}>
            <RightMenu currentUser={currentUser} />
          </Col>
        </Row>
      </div>
      <Footer />
    </div>
  );
};

export default connect()(MainPage);
