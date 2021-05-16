import React, { useState } from 'react';
import {
  Avatar, Button, Dropdown, Menu, Modal, Upload, Input, notification,
} from 'antd';
import { Redirect } from 'react-router-dom';
import moment from 'moment';
import { connect } from 'react-redux';
import {
  UserOutlined, EllipsisOutlined, EditOutlined, DeleteOutlined, ExclamationCircleOutlined, PlusOutlined,
} from '@ant-design/icons';
import { updatePostById, deletePostById } from '../../services/post.service';
import updatePost from '../../actions/updatePost';
import url from '../../utils/route';

const { TextArea } = Input;

const NotiHeader = ({
  poster, createdAt, posterType, postId, noti, dispatch, postUpdated,
}) => {
  const preFile = [];
  if (noti.image && noti.image.length > 0) {
    noti.image.map((i) => preFile.push({
      uid: noti.image.indexOf(i),
      name: 'previous.file',
      status: 'done',
      src: i,
      url: `${url}${i}`,
    }));
  }
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newContent, setContent] = useState(noti.content);
  const [newVideo, setVideo] = useState(noti.video === undefined ? null : noti.video);
  const [previousFiles, setPreFile] = useState(preFile);
  const [currentFile, setFile] = useState([]);
  const [redirect, setRedirect] = useState(false);

  let name;
  let posterAvatar = '';
  let isCurrentUser = false;
  if (posterType === 'student') {
    const {
      display_name, avatar, student_id,
    } = poster;
    name = display_name;
    const currentUserId = localStorage.getItem('user');
    isCurrentUser = student_id === currentUserId;
    if (avatar && avatar.includes('public')) {
      posterAvatar = `${url}${avatar}`;
    } else {
      posterAvatar = avatar;
    }
  }

  const showStatus = (type, m) => {
    notification[type]({
      message: m,
      placement: 'bottomRight',
    });
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    const previous_files = [];
    if (previousFiles && previousFiles.length > 0) {
      previousFiles.map((item) => previous_files.push(item.src));
    }
    const data = {
      post_id: postId,
      content: newContent,
      attachment: currentFile,
      previous_files,
    };

    console.log(data);

    if (newVideo !== undefined && newVideo !== '' && newVideo !== null) {
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|v=|\?v=)([^#&]*).*/;
      const match = newVideo.match(regExp);
      if (match && match[2].length === 11) {
        data.video = newVideo;
      } else {
        showStatus('error', 'url video không hợp lệ');
        return;
      }
    }
    const res = await updatePostById(data);
    console.log(res);
    if (res.code === 1) {
      showStatus('success', res.message);
      dispatch(updatePost(!postUpdated));
    } else {
      showStatus('error', res.message);
    }
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setFile([]);
    setContent(noti.content);
    setVideo(noti.video);
    setPreFile(preFile);
  };

  const deletePost = async () => {
    const res = await deletePostById(postId);
    console.log(res);
    if (res.code === 1) {
      showStatus('success', res.message);
      dispatch(updatePost(!postUpdated));
    } else {
      showStatus('error', res.message);
    }
  };

  const confirm = () => {
    Modal.confirm({
      title: 'Xác nhận xoá bài viết',
      icon: <ExclamationCircleOutlined />,
      content: 'Bạn chắc chắn xoá bài viết này',
      okText: 'Xác nhận',
      cancelText: 'Huỷ',
      onOk() {
        deletePost();
      },
      onCancel() {
        console.log('Huỷ xoá bài viết');
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

  const menu = (
    <Menu style={{ width: 250 }} onClick={onClick}>
      <Menu.Item key="1">
        <div className="d-flex flex-row align-items-center justify-content-start py-2">
          <Button className="general-layout btn-dropdown" shape="circle" icon={<EditOutlined />} />
          <span className="user-name px-2">Sửa bài viết</span>
        </div>
      </Menu.Item>
      <Menu.Item key="2">
        <div className="d-flex flex-row align-items-center justify-content-start py-2">
          <Button className="general-layout btn-dropdown" shape="circle" icon={<DeleteOutlined />} />
          <span className="user-name px-2">Xoá bài viết</span>
        </div>
      </Menu.Item>
    </Menu>
  );

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
    defaultFileList: previousFiles,
    currentFile,
  };

  const addVideo = (e) => {
    console.log(e.target.value);
    setVideo(e.target.value);
  };

  if (redirect) {
    return <Redirect to={`/profile/student/${poster.student_id}`} />;
  }

  return (
    <div className="card-noti-header-holder">
      <div className="card-noti-poster">
        <Avatar
          src={posterAvatar}
          size="large"
          className="d-flex align-items-center justify-content-center header-avatar"
          icon={<UserOutlined />}
        />
        <div className="user">
          <Button className="btn-route-profile" onClick={() => setRedirect(true)} type="link"><span className="user-name route-profile">{name}</span></Button>
          <span className="create-time">{moment(createdAt).format('DD/MM/YYYY hh:mm A')}</span>
        </div>
      </div>
      {isCurrentUser ? (
        <Dropdown overlay={menu} placement="bottomRight" trigger="click" className="mx-2">
          <Button icon={<EllipsisOutlined />} size="large" shape="circle" className="btn-more" />
        </Dropdown>
      ) : null}
      <Modal
        title="Sửa bài viết"
        width={700}
        destroyOnClose
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
        <span className="user-name pt-3 pb-2">Nội dung</span>
        <TextArea row="7" onChange={(e) => setContent(e.target.value)} className="w-100 p-2 textarea-text" defaultValue={newContent} placeholder="Nhập nội dung bài viết" />
        <span className="user-name pt-3 pb-2">Video URL</span>
        <Input onChange={addVideo} defaultValue={newVideo} className="textarea-text" placeholder="Nhập URL video" />
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
    </div>
  );
};

const mapStateToProps = (state) => ({
  postUpdated: state.updatePost,
  redirectFaculty: state.redirectFaculty,
});

export default connect(mapStateToProps)(NotiHeader);
