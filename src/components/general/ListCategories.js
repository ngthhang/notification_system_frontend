import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Button } from 'antd';
import { Redirect } from 'react-router-dom';
import colorArray from '../../utils/colorArray';
import changeRedirect from '../../actions/redirectFaculty';

const list = [
  {
    id: '1',
    name: 'khoa Công nghệ thông tin',
    aliasKey: 'CNTT',
  },
  {
    id: '2',
    name: 'khoa Công nghệ thông tin',
    aliasKey: 'CNTT',
  }, {
    id: '3',
    name: 'khoa Công nghệ thông tin',
    aliasKey: 'CNTT',
  }, {
    id: '4',
    name: 'khoa Công nghệ thông tin',
    aliasKey: 'CNTT',
  }, {
    id: '5',
    name: 'khoa Công nghệ thông tin',
    aliasKey: 'CNTT',
  }, {
    id: '6',
    name: 'khoa Công nghệ thông tin',
    aliasKey: 'CNTT',
  }, {
    id: '7',
    name: 'khoa Công nghệ thông tin',
    aliasKey: 'CNTT',
  }, {
    id: '8',
    name: 'khoa Công nghệ thông tin',
    aliasKey: 'CNTT',
  }, {
    id: '9',
    name: 'khoa Công nghệ thông tin',
    aliasKey: 'CNTT',
  }, {
    id: '20',
    name: 'khoa Công nghệ thông tin',
    aliasKey: 'CNTT',
  },
];

const ListCategories = ({ dispatch }) => {
  dispatch(changeRedirect('categories'));
  const [key, setKey] = useState(0);
  const [redirect, enableRedirect] = useState(false);
  const routeCategory = (aliasKey) => {
    enableRedirect(true);
    setKey(aliasKey);
  };

  if (redirect) {
    return <Redirect to={`/categories/${key}`} />;
  }

  return (
    <>
      <span className="list-header">Danh sách các chuyên mục (12)</span>
      <Row
        className="general-layout-row w-100 p-4"
      >
        {list.map((item) => (
          <Col span={4} xs={24} sm={11} md={11} lg={4} xxl={4} xl={4} className="card-category p-0">
            <div className="header" style={{ backgroundColor: colorArray[Math.floor(Math.random() * colorArray.length)], width: '100%', height: '100px' }} />
            <div className="general-layout align-items-start w-100 p-3">
              <span className="name text-wrap">{item.name}</span>
              <span>{item.aliasKey}</span>
              <Button onClick={() => routeCategory(item.aliasKey)} className="btn">Xem chi tiết</Button>
            </div>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default connect()(ListCategories);
