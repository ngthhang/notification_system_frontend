import React from 'react';
import { GoogleOutlined, HomeOutlined, IdcardOutlined } from '@ant-design/icons';

const chooseIcon = (type) => {
  switch (type) {
    case 'id':
      return <IdcardOutlined style={{ fontSize: '35px', color: '#fa8c16 ' }} />;
    case 'faculty':
      return <HomeOutlined style={{ fontSize: '35px', color: '#fa8c16 ' }} />;
    case 'email':
      return <GoogleOutlined style={{ fontSize: '35px', color: '#fa8c16 ' }} />;
    default:
      return null;
  }
};

const chooseLabel = (type) => {
  switch (type) {
    case 'id':
      return <span>Mã số sinh viên</span>;
    case 'faculty':
      return <span>Thuộc khoa</span>;
    case 'email':
      return <span>Email</span>;
    default:
      return null;
  }
};

const ProfileAboutDetail = ({ value, type }) => {
  const icon = chooseIcon(type);
  const labelText = chooseLabel(type);
  return (
    <div className="general-layout-row pb-3">
      {icon}
      <div className="general-layout align-items-start mx-3">
        {labelText}
        <span className="user-name">{value}</span>
      </div>
    </div>
  );
};

export default ProfileAboutDetail;
