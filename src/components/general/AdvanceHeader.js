import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {
  Avatar, Dropdown, Menu, Button, Tooltip, Modal, Input, Form, notification, Space, Skeleton,
} from 'antd';
import {
  UserOutlined, CaretDownOutlined, LogoutOutlined, PlusOutlined, EditOutlined,
} from '@ant-design/icons';
import changeRedirect from '../../actions/redirectFaculty';
import { findUser, changePassword } from '../../services/user.service';
import { logOut } from '../../services/auth.service';
import { findStudent } from '../../services/student.service';
import url from '../../utils/route';

const AdvanceHeader = ({
  logo, redirectFaculty, dispatch, infoUpdated,
}) => {
  const [redirect, enableRedirect] = useState(false);
  const [user, setUser] = useState({});
  const [isModalVisible, setModalShowPassword] = useState(false);
  const [role, setRole] = useState('student');
  const [id, setId] = useState('');
  const [currentAvatar, setAvatar] = useState('');
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);

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
          avatar = `${url}${data.avatar}`;
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
    setLoading(false);
  }, [infoUpdated]);

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
      case '2':
        setModalShowPassword(true);
        break;
      default:
        break;
    }
  };

  const showStatusChangePassword = (type, m) => {
    notification[type]({
      message: m,
      placement: 'bottomRight',
    });
  };

  const onFinish = async (values) => {
    console.log('Received values of form: ', values);
    const userId = localStorage.getItem('user');
    const { oldPassword, newPassword } = values;
    const data = {
      userId,
      currentPassword: oldPassword,
      newPassword,
    };
    const res = await changePassword(data);
    const { code, message } = res;
    if (code === 1) {
      showStatusChangePassword('success', message);
    } else {
      showStatusChangePassword('error', message);
    }
    setModalShowPassword(false);
    form.resetFields();
  };

  const handleCancel = () => {
    setModalShowPassword(false);
  };

  const menu = (
    <Menu style={{ width: 250 }} onClick={onClick}>
      {role === 'student' ? (
        <Menu.Item key="1">
          <div className="d-flex flex-row align-items-center justify-content-start py-2">
            <Button className="general-layout btn-dropdown" shape="circle" icon={<UserOutlined />} />
            <span className="user-name px-2">Xem trang c?? nh??n</span>
          </div>
        </Menu.Item>
      ) : null}
      {role !== 'student' ? (
        <Menu.Item key="2">
          <div className="d-flex flex-row align-items-center justify-content-start py-2">
            <Button className="general-layout btn-dropdown" shape="circle" icon={<EditOutlined />} />
            <span className="user-name px-2">?????i m???t kh???u m???i</span>
          </div>
        </Menu.Item>
      ) : null}
      <Menu.Item key="3">
        <div className="d-flex flex-row align-items-center justify-content-start py-2">
          <Button className="general-layout btn-dropdown" shape="circle" icon={<LogoutOutlined />} />
          <span className="user-name px-2">????ng xu???t</span>
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
        showStatusChangePassword('success', '????ng xu???t th??nh c??ng');
        return <Redirect to="/login" />;
      case 'profile':
        return <Redirect to={`/profile/student/${id}`} />;
      case 'newsfeed':
        return <Redirect to="/" />;
      case 'create-account':
        return <Redirect to="/admin" />;
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
        {loading ? (
          <Space className="general-layout btn-profile flex-row mx-2">
            <Skeleton.Avatar active shape="circle" size="medium" />
            <Skeleton.Button style={{ width: 150 }} active size="medium" shape="round" />
          </Space>
        ) : (
          <Button onClick={redirectProfile} className="general-layout btn-profile flex-row mx-2">
            <Avatar className="d-flex align-items-center justify-content-center header-avatar" src={currentAvatar} icon={<UserOutlined />} />
            <span className="user-name mx-2">{user && role === 'student' ? user.display_name : user.name}</span>
          </Button>
        )}

        {role === 'admin' ? (
          <Tooltip title="T???o t??i kho???n">
            <Button className="general-layout btn-dropdown mx-2" onClick={redirectCreateAccount} shape="circle" size="large" icon={<PlusOutlined />} />
          </Tooltip>
        ) : null}
        <Tooltip title="T??i kho???n">
          <Dropdown overlay={menu} trigger="click" className="mx-2">
            <Button className="general-layout btn-dropdown" shape="circle" size="large" icon={<CaretDownOutlined />} />
          </Dropdown>
        </Tooltip>
      </div>
      <Modal
        title="?????i m???t kh???u m???i"
        width={700}
        id="card-create-post"
        bodyStyle={{
          overflow: 'auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'start',
          justifyContent: 'start',
          height: 'auto',
        }}
        visible={isModalVisible}
        closable
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}
          name="register"
          onFinish={onFinish}
          scrollToFirstError
          className="w-100"
        >
          <Form.Item
            name="oldPassword"
            label="M???t kh???u c??"
            rules={[
              {
                required: true,
                message: 'Vui l??ng nh???p m???t kh???u c??',
              },
              { min: 6, message: 'M???t kh???u t???i thi???u 6 k?? t???' },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="newPassword"
            label="M???t kh???u m???i"
            rules={[
              {
                required: true,
                message: 'Vui l??ng nh???p m???t kh???u m???i',
              },
              { min: 6, message: 'M???t kh???u t???i thi???u 6 k?? t???' },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            label="X??c nh???n l???i m???t kh???u"
            dependencies={['newPassword']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Vui l??ng x??c nh???n l???i m???t kh???u m???i',
              },
              { min: 6, message: 'M???t kh???u t???i thi???u 6 k?? t???' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('newPassword') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Kh??ng kh???p v???i m???t kh???u m???i'));
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              ?????i m???t kh???u
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => ({
  logo: state.logoImg,
  redirectFaculty: state.redirectFaculty,
  infoUpdated: state.updateUserInfo,
});

export default connect(mapStateToProps)(AdvanceHeader);
