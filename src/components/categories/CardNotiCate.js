import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {
  Card, Button, Dropdown, Menu, Input, Modal, Upload, notification,
} from 'antd';
import {
  EllipsisOutlined, ExclamationCircleOutlined, DeleteOutlined, EditOutlined, PlusOutlined,
} from '@ant-design/icons';
import { updateNoti, deleteNoti } from '../../services/notification.service';
import { getUser } from '../../services/user.service';
import updateNotifi from '../../actions/updateNoti';
import CardNotiImageGroup from './CardNotiImageGroup';
import CardNotiLoading from './CardNotiLoading';
import url from '../../utils/route';

const { TextArea } = Input;
const CardNotiCate = ({
  notiUpdated, dispatch, item, redirectFaculty, editUpdated,
}) => {
  const images = item.files_url;
  const preFile = [];

  if (images !== undefined && images.length > 0) {
    images.map((i) => preFile.push({
      uid: images.indexOf(i),
      name: 'previous.file',
      status: 'done',
      src: i,
      url: `${url}${i}`,
    }));
  }
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [header, setHeader] = useState(item.header);
  const [content, setContent] = useState(item.content);
  const [redirect, setRedirect] = useState(false);
  const [editor, setEditor] = useState({});
  const [currentFile, setFile] = useState([]);
  const [previousFiles, setPreFile] = useState(preFile);
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    setHeader(item.header);
    setContent(item.content);
    setPreFile(preFile);
    setFile([]);
    const data = await getUser(item.poster);
    setEditor(data);
  }, [editUpdated]);

  const currentUserId = localStorage.getItem('user');
  const isCurrentUser = currentUserId === item.poster;

  const showStatus = (type, m) => {
    notification[type]({
      message: m,
      placement: 'bottomRight',
    });
  };

  const deleteNotify = async () => {
    const data = {
      noti_id: item._id,
      poster: item.poster,
    };
    const res = await deleteNoti(data);
    console.log(res);
    if (res.code === 1) {
      showStatus('success', res.message);
      dispatch(updateNotifi(!notiUpdated));
    } else {
      showStatus('error');
    }
    if (redirectFaculty === 'noti-detail') {
      setRedirect(true);
    }
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleEditNotify = async () => {
    const { _id } = item.category;
    const previous_files = [];
    const data = {
      header,
      content,
      attachment: currentFile,
      notify_id: item._id,
      category: _id,
    };
    if (previousFiles && previousFiles.length > 0) {
      previousFiles.map((i) => previous_files.push(i.src));
      data.previous_files = previous_files;
    }
    console.log(data);
    const res = await updateNoti(data);
    if (res.code === 1) {
      showStatus('success', res.message);
      dispatch(updateNotifi(!notiUpdated));
    } else {
      showStatus('error', res.message);
    }
    setIsModalVisible(false);
    // setHeader(item.header);
    // setContent(item.content);
    // setFile([]);
    // setPreFile(preFile);
  };

  const handleOk = () => {
    handleEditNotify();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setHeader(item.header);
    setContent(item.content);
    setFile([]);
    setPreFile(preFile);
  };

  const confirm = () => {
    Modal.confirm({
      title: 'Xác nhận xoá bài viết',
      icon: <ExclamationCircleOutlined />,
      content: 'Bạn chắc chắn xoá bài viết này',
      okText: 'Xác nhận',
      cancelText: 'Huỷ',
      onOk() {
        deleteNotify();
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  const onClick = ({ key }) => {
    switch (key) {
      case '1':
        showModal();
        break;
      case '2':
        confirm();
        break;
      default:
        break;
    }
  };

  const props = {
    onRemove: (file) => {
      if (file.name === 'previous.file') {
        setPreFile(() => {
          if (previousFiles.length === 1) {
            return setPreFile([]);
          }
          const index = previousFiles.indexOf(file);
          const newFileList = previousFiles.slice();
          newFileList.splice(index, 1);
          return newFileList;
        });
      } else {
        setFile(() => {
          if (currentFile.length === 1) {
            return setFile([]);
          }
          const index = currentFile.indexOf(file);
          const newFileList = currentFile.slice();
          newFileList.splice(index, 1);
          return newFileList;
        });
      }
    },
    beforeUpload: (file) => {
      if (file.name !== 'previous.file') {
        setFile([...currentFile, file]);
      }
      return false;
    },
    defaultFileList: preFile,
    currentFile,
  };

  const menu = (
    <Menu style={{ width: 250 }} onClick={onClick}>
      <Menu.Item key="1">
        <div className="d-flex flex-row align-items-center justify-content-start py-2">
          <Button className="general-layout btn-dropdown" shape="circle" icon={<EditOutlined />} />
          <span className="user-name px-2">Sửa thông báo</span>
        </div>
      </Menu.Item>
      <Menu.Item key="2">
        <div className="d-flex flex-row align-items-center justify-content-start py-2">
          <Button className="general-layout btn-dropdown" shape="circle" icon={<DeleteOutlined />} />
          <span className="user-name px-2">Xoá thông báo</span>
        </div>
      </Menu.Item>
    </Menu>
  );

  setTimeout(() => { setLoading(false); },
    2000);

  if (redirect) {
    return <Redirect to="/" />;
  }

  if (loading) {
    return <CardNotiLoading />;
  }
  return (
    <Card
      title={item.header}
      className="w-100 card-noti-cate"
    >
      <div className="w-100 general-layout align-items-start">
        <div className="w-100 general-layout-row align-itemsm-center justify-content-between mb-2">
          <span className="text-wrap text-content">{item.content}</span>
          {isCurrentUser ? (
            <Dropdown overlay={menu} placement="bottomRight" trigger="click" className="mx-4 align-self-start">
              <Button icon={<EllipsisOutlined />} size="large" shape="circle" className="btn-more-noti" />
            </Dropdown>
          ) : null}
        </div>
        {images && images.length > 0 ? (
          <CardNotiImageGroup images={images} id={item._id} />
        ) : null}
        <span className="text-time mt-2 align-self-end">
          Phòng ban:
          {' '}
          {item.category && item.category.name}
        </span>
        <span className="text-time align-self-end">
          Người phụ trách:
          {' '}
          {editor.name}
        </span>
        <span className="text-time align-self-end">
          Được đăng vào lúc:
          {' '}
          {moment(item.create_at).format('DD/MM/YYYY hh:mm A')}
        </span>
      </div>
      <Modal
        title="Sửa bài viết"
        width={700}
        id="card-create-post"
        destroyOnClose
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
        <span className="user-name pt-3 pb-2">Tiêu đề</span>
        <Input className="textarea-text" onChange={(e) => setHeader(e.target.value)} defaultValue={header} placeholder="Nhập tiêu đề thông báo" />
        <span className="user-name pt-3 pb-2">Nội dung</span>
        <TextArea row="7" onChange={(e) => setContent(e.target.value)} className="w-100 p-2 textarea-text" defaultValue={content} placeholder="Nhập nội dung thông báo" />
        <span className="user-name pt-3 pb-2">Hình ảnh đính kèm</span>
        <div className="general-layout-row justify-content-start flex-wrap w-100">
          <Upload
            {...props}
            listType="picture-card"
          >
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          </Upload>
        </div>
      </Modal>
    </Card>
  );
};

const mapStateToProps = (state) => ({
  notiUpdated: state.updateNoti,
  editUpdated: state.updateEdit,
  redirectFaculty: state.redirectFaculty,
});

export default connect(mapStateToProps)(CardNotiCate);
