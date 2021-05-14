import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import generator from 'generate-password';
import {
  Form,
  Spin,
  Input,
  Tooltip,
  Button,
  Checkbox,
  notification,
  Modal,
  Row, Col,
} from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import setDimension from '../../actions/windowDimension';
import { getAllCategories } from '../../services/categories.service';
import { createUser } from '../../services/user.service';
import changeRedirect from '../../actions/redirectFaculty';
import AdvanceHeader from '../general/AdvanceHeader';
import Footer from '../general/Footer';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const AddAccount = ({ dispatch, windowDimension }) => {
  dispatch(changeRedirect('create-account'));
  const [initPassword, setPassword] = useState(generator.generate({
    length: 10,
    numbers: true,
  }));
  const [form] = Form.useForm();
  const [categories, setCate] = useState([]);
  const [loading, setLoading] = useState(true);

  const onChange = (checkedValues) => {
    console.log(checkedValues);
  };

  const openCopySuccess = (type) => {
    notification[type]({
      message: 'Copy to clipboard',
      placement: 'bottomRight',
    });
  };

  const copyClipboard = (password) => {
    navigator.clipboard.writeText(password);
    openCopySuccess('success');
  };

  const createSuccess = (username, password) => {
    Modal.success({
      title: 'Tạo tài khoản thành công',
      content: (
        <div className="w-100 my-5">
          <p>
            Tên đăng nhập:
            {' '}
            <Button className="w-100" onClick={() => copyClipboard(username)}>{username}</Button>
          </p>
          <p>
            Mật khẩu:
            {' '}
            <Button className="w-100" onClick={() => copyClipboard(password)}>{password}</Button>
          </p>
        </div>
      ),
    });
  };

  const createFail = (m) => {
    Modal.error({
      title: 'Tạo tài khoản thất bại',
      content: m,
    });
  };

  const onFinish = async (values) => {
    values.password = initPassword;
    values.role = 'Faculty';
    console.log(values);
    const res = await createUser(values);
    const { code } = res;
    if (code === 0) {
      return createFail(res.message);
    }
    form.resetFields();
    setPassword(generator.generate({
      length: 10,
      numbers: true,
    }));
    return createSuccess(values.username, values.password);
  };

  const updateDimensions = () => {
    dispatch(setDimension(window.innerWidth, window.innerHeight));
  };

  useEffect(async () => {
    const res = await getAllCategories();
    setCate(res);
    window.addEventListener('resize', updateDimensions);
    setLoading(false);
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
            form={form}
            className="py-3 add-account-form"
            labelCol={{ span: width < 1300 ? 24 : 6 }}
            wrapperCol={{ span: width < 1300 ? 24 : 12 }}
            layout="horizontal"
            size="large"
            onFinish={onFinish}
          >
            <Form.Item
              name="name"
              label="Họ tên"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập họ tên',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="username"
              label="Tên đăng nhập"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập username',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="role"
              label="Quyền tài khoản"
            >
              <Input disabled defaultValue="Phòng / Khoa" />
            </Form.Item>
            <Tooltip title="Mật khẩu được tạo tự động">
              <Form.Item
                initvalues={initPassword}
                name="password"
                label="Mật khẩu"
              >
                <Input defaultValue={initPassword} disabled />
              </Form.Item>
            </Tooltip>
            <Form.Item
              name="category_id"
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
