import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  Row, Col, Button, Spin,
} from 'antd';
import { Redirect } from 'react-router-dom';
import { LoadingOutlined } from '@ant-design/icons';
import { getAllCategories } from '../../services/categories.service';
import changeRedirect from '../../actions/redirectFaculty';
import AdvanceHeader from './AdvanceHeader';
import Footer from './Footer';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const ListCategories = ({ dispatch }) => {
  dispatch(changeRedirect('categories'));
  const [key, setKey] = useState(0);
  const [listCate, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [redirect, enableRedirect] = useState(false);

  useEffect(async () => {
    const res = await getAllCategories();
    setList(res);
    setLoading(false);
  }, []);

  const routeCategory = (aliasKey) => {
    enableRedirect(true);
    setKey(aliasKey);
  };

  if (loading) {
    return (
      <div className="general-layout justify-content-start h-100">
        <AdvanceHeader />
        <Spin indicator={antIcon} className="my-5 h-100" />
        <Footer />
      </div>
    );
  }

  if (redirect) {
    return <Redirect to={`/categories/${key}`} />;
  }

  return (
    <div className="general-layout">
      <AdvanceHeader />
      <>
        <span className="list-header">Danh sách các chuyên mục (12)</span>
        <Row
          className="general-layout-row w-100 p-4"
        >
          {listCate.map((item) => (
            <Col span={4} xs={24} sm={24} md={10} lg={6} xxl={6} xl={6} className="card-category w-100 p-0">
              <div className="general-layout align-items-start w-100 p-3 card-cate">
                <span className="name text-wrap">{item.name}</span>
                <span>{item.alias_key}</span>
                <Button onClick={() => routeCategory(item.alias_key)} className="btn">Xem chi tiết</Button>
              </div>
            </Col>
          ))}
        </Row>
      </>
      <Footer />
    </div>
  );
};

export default connect()(ListCategories);
