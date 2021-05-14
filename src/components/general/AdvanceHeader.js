import React, { useState, useEffect } from 'react';
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

const AdvanceHeader = ({ logo, redirectFaculty, dispatch }) => {
  const [redirect, enableRedirect] = useState(false);
  const [user, setUser] = useState({});
  const [role, setRole] = useState('student');
  const [id, setId] = useState('');
  const [currentAvatar, setAvatar] = useState('');

  useEffect(async () => {
    const currentRole = localStorage.getItem('role');
    const currentId = localStorage.getItem('user');
    let data;
    let avatar;
    switch (currentRole) {
      case 'student':
        data = await findStudent(currentId);
        if (data.code === 0 || data.code === 13) {
          logOut();
          break;
        }
        if (data.avatar.includes('public')) {
          avatar = `https://witty-ruby-lace.glitch.me/${data.avatar}`;
        } else {
          avatar = data.avatar;
        }
        setUser(data);
        setAvatar(avatar);
        break;
      case 'Faculty':
        data = await findUser(currentId);
        if (data.code === 0 || data.code === 13) {
          logOut();
          break;
        }
        setUser(data);
        break;
      default:
        data = await findUser(currentId);
        if (data.code === 0 || data.code === 13) {
          logOut();
          break;
        }
        setUser(data);
        break;
    }

    setRole(currentRole);
    setId(currentId);
  }, []);

  const redirectProfile = () => {
    if (redirectFaculty === 'profile' || role !== 'student') {
      return;
    }
    enableRedirect(true);
    dispatch(changeRedirect('profile'));
  };

  const redirectNewsFeed = () => {
    if (redirectFaculty === 'newsfeed') {
      return;
    }
    enableRedirect(true);
    dispatch(changeRedirect('newsfeed'));
  };

  const handleLogout = () => {
    enableRedirect(true);
    dispatch(changeRedirect('logout'));
  };

  const redirectCreateAccount = () => {
    enableRedirect(true);
    dispatch(changeRedirect('create-account'));
  };

  const onClick = ({ key }) => {
    switch (key) {
      case '3':
        handleLogout();
        break;
      case '1':
        redirectProfile();
        break;
      default:
        break;
    }
  };

  const menu = (
    <Menu style={{ width: 250 }} onClick={onClick}>
      {role === 'student' ? (
        <Menu.Item key="1">
          <div className="d-flex flex-row align-items-center justify-content-start py-2">
            <Button className="general-layout btn-dropdown" shape="circle" icon={<UserOutlined />} />
            <span className="user-name px-2">Xem trang cá nhân</span>
          </div>
        </Menu.Item>
      ) : null}
      <Menu.Item key="3">
        <div className="d-flex flex-row align-items-center justify-content-start py-2">
          <Button onClick={handleLogout} className="general-layout btn-dropdown" shape="circle" icon={<LogoutOutlined />} />
          <span className="user-name px-2">Đăng xuất</span>
        </div>
      </Menu.Item>
    </Menu>
  );

  if (redirect) {
    switch (redirectFaculty) {
      case 'logout':
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('role');
        return <Redirect to="/login" />;
      case 'profile':
        window.location.href = `http://localhost:3000/profile/student/${id}`;
        break;
      case 'newsfeed':
        return <Redirect to="/" />;
      case 'create-account':
        return <Redirect to="admin" />;
      default:
        break;
    }
  }
  return (
    <div className="admin-header sticky-top d-flex bg-white flex-row w-100 align-items-center justify-content-between px-4 py-2">
      <Button onClick={redirectNewsFeed} className="btn-logo">
        <img src={logo} alt="logo truong" className="logo-header" />
      </Button>
      <div className="w-75 d-flex align-items-center justify-content-end">
        <Button onClick={redirectProfile} className="general-layout btn-profile flex-row mx-2">
          <Avatar className="d-flex align-items-center justify-content-center header-avatar" src={currentAvatar} icon={<UserOutlined />} />
          <span className="user-name mx-2">{user && role === 'student' ? user.display_name : user.name}</span>
        </Button>
        {role === 'admin' ? (
          <Tooltip title="Tạo tài khoản">
            <Button className="general-layout btn-dropdown mx-2" onClick={redirectCreateAccount} shape="circle" size="large" icon={<PlusOutlined />} />
          </Tooltip>
        ) : null}
        <Tooltip title="Tài khoản">
          <Dropdown overlay={menu} trigger="click" className="mx-2">
            <Button className="general-layout btn-dropdown" shape="circle" size="large" icon={<CaretDownOutlined />} />
          </Dropdown>
        </Tooltip>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  logo: state.logoImg,
  redirectFaculty: state.redirectFaculty,
});

export default connect(mapStateToProps)(AdvanceHeader);
