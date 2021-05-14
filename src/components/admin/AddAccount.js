import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import generator from 'generate-password';
import {
  Form,
  Spin,
  Input,
  Button,
  Checkbox,
  Tooltip,
  Row, Col,
} from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import setDimension from '../../actions/windowDimension';
import { getAllCategories } from '../../services/categories.service';
import changeRedirect from '../../actions/redirectFaculty';
import AdvanceHeader from '../general/AdvanceHeader';
import Footer from '../general/Footer';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const AddAccount = ({ dispatch, windowDimension }) => {
  const [fullName, setFullName] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [checkedCate, setCheckedCate] = useState([]);
  dispatch(changeRedirect('create-account'));
  const [categories, setCate] = useState([]);
  const [loading, setLoading] = useState(true);

  const onChange = (checkedValues) => {
    setCheckedCate(checkedValues);
  };

  const onFinish = (values) => {
    console.log(values);
    const data = {
      category_id: checkedCate,
      username: userName,
      role: 'Faculty',
      name: fullName,
      avatar: null,
      password,
    };

    console.log(data);
  };

  const updateDimensions = () => {
    dispatch(setDimension(window.innerWidth, window.innerHeight));
  };

  useEffect(async () => {
    const res = await getAllCategories();
    setCate(res);
    window.addEventListener('resize', updateDimensions);
    setLoading(false);
    setPassword(generator.generate({
      length: 10,
      numbers: true,
    }));
    return (() => {
      window.removeEventListener('resize', updateDimensions);
    });
  }, []);

  const { width } = windowDimension;

  if (loading) {
    return (
      <div className="general-screen h-100">
        <AdvanceHeader />
        <Spin indicator={antIcon} className="my-5 h-100" />
        <Footer />
      </div>
    );
  }

  return (
    <div className="general-screen">
      <AdvanceHeader />
      <div className="general-layout mt-4">
        <div className="col-xl-9 col-xxl-9 col-lg-9 col-md-11 col-sm-11 col-11 align-items-center justify-content-center bg-white card-add-account p-3">
          <span className="header-text align-self-center pt-4">TẠO TÀI KHOẢN</span>
          <Form
            className="py-3 add-account-form"
            labelCol={{ span: width < 1300 ? 24 : 6 }}
            wrapperCol={{ span: width < 1300 ? 24 : 12 }}
            layout="horizontal"
            size="large"
            onFinish={onFinish}
          >
            <Form.Item
              name="fullname"
              label="Họ tên"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập họ tên',
                },
              ]}
            >
              <Input onChange={(e) => setFullName(e.target.value)} />
            </Form.Item>
            <Form.Item
              name="username"
              label="Username"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập username',
                },
              ]}
            >
              <Input onChange={(e) => setUserName(e.target.value)} />
            </Form.Item>
            <Tooltip title="Mật khẩu được tạo tự động">
              <Form.Item
                label="Mật khẩu"
              >
                <Input onChange={(e) => setPassword(e.target.value)} value={password} disabled />
              </Form.Item>
            </Tooltip>
            <Form.Item
              name="topic"
              label="Chọn chuyên mục đăng bài"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng chọn ít nhất 1 chuyên mục',
                },
              ]}
            >
              <Checkbox.Group onChange={onChange}>
                <Row>
                  {categories.length > 0 && categories.map((item) => (
                    <Col span={12} key={item._id}>
                      <Checkbox value={item._id}>{item.name}</Checkbox>
                    </Col>
                  ))}
                </Row>
              </Checkbox.Group>
            </Form.Item>
            <div className="d-flex flex-column align-items-center justify-content-center w-100 pt-5">
              <Form.Item>
                <Button htmlType="submit" danger type="primary">Tạo tài khoản</Button>
              </Form.Item>
            </div>
          </Form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

const mapStateToProps = (state) => ({
  windowDimension: state.windowDimension,
});

export default connect(mapStateToProps)(AddAccount);
