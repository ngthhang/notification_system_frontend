import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {
  Avatar, Dropdown, Menu, Button, Tooltip,
} from 'antd';
import {
  UserOutlined, CaretDownOutlined, LogoutOutlined,
} from '@ant-design/icons';
import changeRedirect from '../../actions/redirectFaculty';

class AdvanceHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
    };
    this.menu = (
      <Menu style={{ width: 250 }} onClick={this.onClick}>
        <Menu.Item key="1">
          <div className="d-flex flex-row align-items-center justify-content-start py-2">
            <Button className="general-layout btn-dropdown" shape="circle" icon={<UserOutlined />} />
            <span className="user-name px-2">Xem trang cá nhân</span>
          </div>
        </Menu.Item>
        <Menu.Item key="3">
          <div className="d-flex flex-row align-items-center justify-content-start py-2">
            <Button onClick={this.logOut} className="general-layout btn-dropdown" shape="circle" icon={<LogoutOutlined />} />
            <span className="user-name px-2">Đăng xuất</span>
          </div>
        </Menu.Item>
      </Menu>
    );
  }

  onClick = ({ key }) => {
    switch (key) {
      case '3':
        this.logOut();
        break;
      case '1':
        this.redirectProfile();
        break;
      default:
        break;
    }
  };

  redirectProfile = () => {
    const { dispatch, redirectFaculty } = this.props;
    if (redirectFaculty === 'profile') {
      return;
    }
    this.enableRedirect();
    dispatch(changeRedirect('profile'));
  }

  redirectNewsFeed = () => {
    const { dispatch, redirectFaculty } = this.props;
    if (redirectFaculty === 'newsfeed') {
      return;
    }
    this.enableRedirect();
    dispatch(changeRedirect('newsfeed'));
  }

  enableRedirect = () => {
    this.setState({
      redirect: true,
    });
  }

  logOut = () => {
    const { dispatch } = this.props;
    this.enableRedirect();
    dispatch(changeRedirect('logout'));
  }

  render() {
    const { logo, redirectFaculty } = this.props;
    const { redirect } = this.state;
    if (redirect) {
      switch (redirectFaculty) {
        case 'logout':
          return <Redirect to="/login" />;
        case 'profile':
          return <Redirect to="/faculty/profile" />;
        case 'newsfeed':
          return <Redirect to="/faculty" />;
        default:
          break;
      }
    }
    return (
      <div className="admin-header sticky-top d-flex bg-white flex-row w-100 align-items-center justify-content-between px-4 py-2">
        <Button onClick={this.redirectNewsFeed} className="btn-logo">
          <img src={logo} alt="logo truong" className="logo-header" />
        </Button>
        <div className="w-75 d-flex align-items-center justify-content-end">
          <Button onClick={this.redirectProfile} className="general-layout btn-profile flex-row mx-2">
            <Avatar className="d-flex align-items-center justify-content-center header-avatar" icon={<UserOutlined />} />
            <span className="user-name mx-2">Khoa CNTT</span>
          </Button>
          <Tooltip title="Tài khoản">
            <Dropdown overlay={this.menu} trigger="click" className="mx-2">
              <Button className="general-layout btn-dropdown" shape="circle" size="large" icon={<CaretDownOutlined />} />
            </Dropdown>
          </Tooltip>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  logo: state.logoImg,
  redirectFaculty: state.redirectFaculty,
});

export default connect(mapStateToProps)(AdvanceHeader);
