import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Divider } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { Redirect } from 'react-router-dom';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
    };
  }

  logOut = () => {
    this.setState({
      redirect: true,
    });
  }

  render() {
    const { logo } = this.props;
    const { redirect } = this.state;

    if (redirect) {
      return <Redirect to="/login" />;
    }
    return (
      <div className="admin-header d-flex bg-white flex-row w-100 align-items-center justify-content-between px-4 py-3 mb-5">
        <img src={logo} alt="logo truong" className="logo-header" />
        <div className="d-flex flex-row align-items-center justify-content-end w-75">
          <div className="d-flex flex-column align-items-center justify-content-end px-3">
            <span className="text">
              Hello,
              {' '}
              <span className="user-name">ngthhang</span>
            </span>
          </div>
          <Divider type="vertical" />
          <Button shape="round" danger className="d-flex align-items-center justify-content-center mx-3" size="large" icon={<LogoutOutlined />} onClick={this.logOut}>Logout</Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  logo: state.logoImg,
});

export default connect(mapStateToProps)(Header);
