import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Form,
  Input,
  Button,
  Checkbox,
  Tooltip,
  Row, Col,
} from 'antd';
import setDimension from '../../actions/windowDimension';

class AddAccount extends Component {
  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }

  onChange = (checkedValues) => {
    console.log('checked = ', checkedValues);
  }

  onFinish = (values) => {
    console.log(values);
  }

  updateDimensions = () => {
    const { dispatch } = this.props;
    dispatch(setDimension(window.innerWidth, window.innerHeight));
  };

  render() {
    const { windowDimension } = this.props;
    const { width } = windowDimension;
    return (
      <div className="general-layout">
        <div className="col-xl-9 col-xxl-9 col-lg-9 col-md-11 col-sm-11 col-11 align-items-center justify-content-center bg-white card-add-account p-3">
          <span className="header-text align-self-center pt-4">TẠO TÀI KHOẢN</span>
          <Form
            className="py-3 add-account-form"
            labelCol={{ span: width < 1300 ? 24 : 6 }}
            wrapperCol={{ span: width < 1300 ? 24 : 12 }}
            layout="horizontal"
            size="large"
            onFinish={this.onFinish}
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
              <Input />
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
              <Input />
            </Form.Item>
            <Tooltip title="Mật khẩu được tạo tự động">
              <Form.Item
                label="Mật khẩu"
              >
                <Input defaultValue="123123123" disabled />
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
              <Checkbox.Group onChange={this.onChange}>
                <Row>
                  <Col span={12}>
                    <Checkbox value="CTHSSV">Phòng Công tác học sinh sinh viên</Checkbox>
                  </Col>
                  <Col span={12}>
                    <Checkbox value="DH">Phòng Đại học</Checkbox>
                  </Col>
                  <Col span={12}>
                    <Checkbox value="SDH">Phòng Sau đại học</Checkbox>
                  </Col>
                  <Col span={12}>
                    <Checkbox value="DTMT">Phòng điện toán và máy tính</Checkbox>
                  </Col>
                  <Col span={12}>
                    <Checkbox value="KTKDCL">Phòng khảo thí và kiểm định chất lượng</Checkbox>
                  </Col>
                  <Col span={12}>
                    <Checkbox value="TC">Phòng tài chính</Checkbox>
                  </Col>
                  <Col span={12}>
                    <Checkbox value="TA">TDT Creative Language Center</Checkbox>
                  </Col>
                  <Col span={12}>
                    <Checkbox value="TH">Trung tâm tin học</Checkbox>
                  </Col>
                  <Col span={12}>
                    <Checkbox value="SDTC">Trung tâm đào tạo phát triển xã hội (SDTC)</Checkbox>
                  </Col>
                  <Col span={12}>
                    <Checkbox value="ATEM">Trung tâm phát triển Khoa học quản lý và Ứng dụng công nghệ (ATEM)</Checkbox>
                  </Col>
                  <Col span={12}>
                    <Checkbox value="DNCSV">Trung tâm hợp tác doanh nghiệp và cựu sinh viên</Checkbox>
                  </Col>
                  <Col span={12}>
                    <Checkbox value="LAW">Khoa Luật</Checkbox>
                  </Col>
                  <Col span={12}>
                    <Checkbox value="NNTH">Trung tâm ngoại ngữ - tin học - bồi dưỡng văn hoá</Checkbox>
                  </Col>
                  <Col span={12}>
                    <Checkbox value="CSKTKD">Viện chính sách kinh tế và kinh doanh</Checkbox>
                  </Col>
                  <Col span={12}>
                    <Checkbox value="MTCN">Khoa Mỹ thuật công nghiệp</Checkbox>
                  </Col>
                  <Col span={12}>
                    <Checkbox value="DDT">Khoa Điện - Điện tử</Checkbox>
                  </Col>
                  <Col span={12}>
                    <Checkbox value="CNTT">Khoa Công nghệ thông tin</Checkbox>
                  </Col>
                  <Col span={12}>
                    <Checkbox value="QTKD">Khoa Điện - Điện tử</Checkbox>
                  </Col>
                  <Col span={12}>
                    <Checkbox value="MT">Khoa Điện - Điện tử</Checkbox>
                  </Col>
                  <Col span={12}>
                    <Checkbox value="LDCD">Khoa Điện - Điện tử</Checkbox>
                  </Col>
                  <Col span={12}>
                    <Checkbox value="TCNH">Khoa Điện - Điện tử</Checkbox>
                  </Col>
                  <Col span={12}>
                    <Checkbox value="GDQT">Khoa Điện - Điện tử</Checkbox>
                  </Col>
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
    );
  }
}

const mapStateToProps = (state) => ({
  windowDimension: state.windowDimension,
});

export default connect(mapStateToProps)(AddAccount);
