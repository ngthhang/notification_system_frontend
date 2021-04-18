import React, { Component } from 'react';
import { Space } from 'antd';
import { CopyrightOutlined } from '@ant-design/icons';

class Footer extends Component {
  render() {
    return (
      <div className="border-top d-flex bg-white flex-row w-100 align-items-center justify-content-start px-4 py-2 mt-5">
        <Space value={10}>
          <span>Copyright Ton Duc Thang University </span>
          <span><CopyrightOutlined /></span>
          <span>2021</span>
        </Space>
      </div>
    );
  }
}

export default Footer;
