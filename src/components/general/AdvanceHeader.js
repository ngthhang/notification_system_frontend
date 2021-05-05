import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {
  Avatar, Dropdown, Menu, Button, Tooltip,
} from 'antd';
import {
  UserOutlined, CaretDownOutlined, LogoutOutlined, PlusOutlined,
} from '@ant-design/icons';
import changeRedirect from '../../actions/redirectFaculty';
import { findUser } from '../../services/user.service';
import { logOut } from '../../services/auth.service';
import { findStudent } from '../../services/student.service';

class AdvanceHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      user: {},
      role: '',
      id: '',
    };
    this.menu = (
      <Menu style={{ width: 250 }} onClick={this.onClick}>
        {this.state.role === 'student' ? (
          <Menu.Item key="1">
            <div className="d-flex flex-row align-items-center justify-content-start py-2">
              <Button className="general-layout btn-dropdown" shape="circle" icon={<UserOutlined />} />
              <span className="user-name px-2">Xem trang cá nhân</span>
            </div>
          </Menu.Item>
        ) : null}
        <Menu.Item key="3">
          <div className="d-flex flex-row align-items-center justify-content-start py-2">
            <Button onClick={this.logOut} className="general-layout btn-dropdown" shape="circle" icon={<LogoutOutlined />} />
            <span className="user-name px-2">Đăng xuất</span>
          </div>
        </Menu.Item>
      </Menu>
    );
  }

  async componentDidMount() {
    const currentRole = localStorage.getItem('role');
    const currentId = localStorage.getItem('user');
    let data;
    switch (currentRole) {
      case 'student':
        data = await findStudent(currentId);
        if (data.code === 0 || data.code === 13) {
          logOut();
          this.logOut();
          break;
        }
        this.setState({
          user: data,
        });
        break;
      case 'Faculty':
        data = await findUser(currentId);
        if (data.code === 0 || data.code === 13) {
          logOut();
          this.logOut();
          break;
        }
        this.setState({
          user: data,
        });
        break;
      default: break;
    }

    this.setState({
      role: currentRole,
      id: currentId,
    });
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
    const {
      redirect, user, role, id,
    } = this.state;
    if (redirect) {
      switch (redirectFaculty) {
        case 'logout':
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          localStorage.removeItem('role');
          return <Redirect to="/login" />;
        case 'profile':
          return <Redirect to={`/profile/${role}/${id}`} />;
        case 'newsfeed':
          return <Redirect to="/" />;
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
            <Avatar className="d-flex align-items-center justify-content-center header-avatar" icon={<UserOutlined />} src={user && role === 'student' ? user.avatar : ''} />
            <span className="user-name mx-2">{user && role === 'student' ? user.display_name : user.name}</span>
          </Button>
          {role === 'Admin' ? (
            <Tooltip title="Tạo tài khoản">
              <Button className="general-layout btn-dropdown mx-2" shape="circle" size="large" icon={<PlusOutlined />} />
            </Tooltip>
          ) : null}
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
