import React from 'react';
import {
  GoogleOutlined, HomeOutlined, IdcardOutlined, TeamOutlined,
} from '@ant-design/icons';

const chooseIcon = (type) => {
  switch (type) {
    case 'id':
      return <IdcardOutlined style={{ fontSize: '35px', color: '#fa8c16 ' }} />;
    case 'faculty':
      return <HomeOutlined style={{ fontSize: '35px', color: '#fa8c16 ' }} />;
    case 'email':
      return <GoogleOutlined style={{ fontSize: '35px', color: '#fa8c16 ' }} />;
    default:
      return <TeamOutlined style={{ fontSize: '35px', color: '#fa8c16 ' }} />;
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
      return <span>Lớp</span>;
  }
};

const ProfileAboutDetail = ({ value, type }) => {
  const icon = chooseIcon(type);
  const isNull = !value || value === '' || value === null || value === undefined || value === 'undefined';
  const labelText = chooseLabel(type);
  return (
    <div className="general-layout-row pb-3">
      {icon}
      <div className="general-layout align-items-start mx-3">
        {labelText}
        {isNull ? (
          <span className="text-update">Chưa có thông tin</span>
        ) : (
          <span className="user-name">{value}</span>
        )}
      </div>
    </div>
  );
};

export default ProfileAboutDetail;
