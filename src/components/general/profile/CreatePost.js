import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  Modal, Avatar, Input, Divider, Button, Select, Image,
} from 'antd';
import {
  UserOutlined, FileImageFilled, VideoCameraFilled,
} from '@ant-design/icons';

const { Option } = Select;
const { TextArea } = Input;

const menuImage = (
  <>
    <Image
      width={100}
      className="p-2"
      src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
    />
    <Image
      width={100}
      className="p-2"
      src="https://images.unsplash.com/photo-1619231313846-0120618da5b8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80"
    />
    <Image
      width={100}
      className="p-2"
      src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
    />
    <Image
      width={100}
      className="p-2"
      src="https://images.unsplash.com/photo-1619231313846-0120618da5b8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80"
    />
    <Image
      width={100}
      className="p-2"
      src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
    />
    <Image
      width={100}
      className="p-2"
      src="https://images.unsplash.com/photo-1619231313846-0120618da5b8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80"
    />
    <Image
      width={100}
      className="p-2"
      src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
    />
    <Image
      width={100}
      className="p-2"
      src="https://images.unsplash.com/photo-1619231313846-0120618da5b8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80"
    />
  </>
);

const CreatePost = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isShowVideo, setShowVideo] = useState(false);

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onChange = (value) => {
    console.log(`selected ${value}`);
  };

  const onBlur = () => {
    console.log('blur');
  };

  const onFocus = () => {
    console.log('focus');
  };

  const onSearch = (val) => {
    console.log('search:', val);
  };

  return (
    <div className="create-post-holder m-0 mb-3 w-100">
      <div className="general-layout-row w-100 px-0">
        <Avatar className="d-flex align-items-center justify-content-center header-avatar" size="large" icon={<UserOutlined />} />
        <Input onClick={() => setIsModalVisible(true)} placeholder="Tạo bài viết công khai..." className="create-post-input" />
      </div>
      <Divider type="horizontal" className="my-3" />
      <div className="general-layout-row justify-content-around w-100">
        <Button className="btn-create-post" icon={<FileImageFilled size="large" style={{ color: '#4E89FF' }} />}>Thêm hình ảnh</Button>
        <Divider type="vertical" className="h-100" />
        <Button className="btn-create-post" icon={<VideoCameraFilled size="large" style={{ color: '#dc3545' }} />}>Thêm video</Button>
      </div>
      <Modal
        title="Tạo thông báo"
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
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <span className="user-name pb-2">Chuyên mục</span>
        <Select
          showSearch
          style={{ width: '100%' }}
          size="large"
          className="textarea-text"
          placeholder="Chọn chuyên mục để đăng bài"
          optionFilterProp="children"
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          onSearch={onSearch}
          filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        >
          <Option value="CNTT" className="textarea-text">Khoa Công nghệ thông tin</Option>
          <Option value="QTKD" className="textarea-text">Khoa Quản trị kinh doanh</Option>
          <Option value="CTSV" className="textarea-text">Phòng công tác sinh viên</Option>
        </Select>
        <span className="user-name pt-3 pb-2">Tiêu đề</span>
        <Input className="textarea-text" placeholder="Nhập tiêu đề thông báo" />
        <span className="user-name pt-3 pb-2">Nội dung</span>
        <TextArea row="7" className="w-100 p-2 textarea-text" placeholder="Nhập nội dung thông báo" />
        {isShowVideo ? (
          <>
            <span className="user-name pt-3 pb-2">Video URL</span>
            <Input className="textarea-text" placeholder="Nhập URL video" />
          </>
        ) : null}
        <span className="user-name pt-3 pb-2">Hình ảnh đính kèm</span>
        <div className="general-layout-row justify-content-start flex-wrap w-100">
          <Image.PreviewGroup>
            {menuImage}
          </Image.PreviewGroup>
        </div>
        <div className="general-layout-row justify-content-around w-100 pt-3">
          <Button className="btn-create-post" icon={<FileImageFilled size="large" style={{ color: '#4E89FF' }} />}>Thêm hình ảnh</Button>
          <Divider type="vertical" className="h-100" />
          <Button onClick={() => setShowVideo(true)} className="btn-create-post" icon={<VideoCameraFilled size="large" style={{ color: '#dc3545' }} />}>Thêm video</Button>
        </div>
      </Modal>
    </div>
  );
};

export default connect()(CreatePost);
