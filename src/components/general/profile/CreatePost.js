import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  Modal, Avatar, Input, Button, Upload, notification,
} from 'antd';
import {
  UserOutlined, PlusOutlined, VideoCameraFilled,
} from '@ant-design/icons';
import updatePost from '../../../actions/updatePost';
import { createPost } from '../../../services/post.service';
import urlRoute from '../../../utils/route';

const { TextArea } = Input;

const CreatePost = ({
  user, postUpdated, dispatch, listUpdated,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isShowVideo, setShowVideo] = useState(false);
  const [currentFile, setFile] = useState([]);
  const [content, setContent] = useState('');
  const [userAva, setUserAva] = useState('');
  const [video, setVideo] = useState('');

  useEffect(() => {
    if (user.avatar.includes('public')) {
      setUserAva(`${urlRoute}${user.avatar}`);
    } else {
      setUserAva(user.avatar);
    }
  }, [listUpdated]);

  const showStatus = (type, message) => {
    notification[type]({
      message,
      placement: 'bottomRight',
    });
  };

  const addVideo = (e) => {
    const url = e.target.value;
    setVideo(url);
  };

  const handleCreatePost = async () => {
    const { user_id } = user;
    const data = {
      poster: user_id,
      images: currentFile,
      content,
    };
    if (video !== '' && video !== undefined) {
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|v=|\?v=)([^#&]*).*/;
      const match = video.match(regExp);
      if (match && match[2].length === 11) {
        data.video = video;
      } else {
        showStatus('error', 'Url video không hợp lệ');
        setVideo('');
        return;
      }
    }
    const res = await createPost(data);
    const { code, message } = res;
    if (code === 1) {
      showStatus('success', message);
      dispatch(updatePost(!postUpdated));
    } else {
      showStatus('error', message);
    }
    setIsModalVisible(false);
    setContent('');
    setVideo('');
    setFile([]);
  };

  const handleOk = () => {
    handleCreatePost();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const props = {
    onRemove: (file) => {
      setFile(() => {
        if (currentFile.length <= 1) {
          return setFile([]);
        }
        const index = currentFile.indexOf(file);
        const newFileList = currentFile.slice();
        newFileList.splice(index, 1);
        return newFileList;
      });
    },
    beforeUpload: (file) => {
      setFile([...currentFile, file]);
      return false;
    },
    currentFile,
  };
  return (
    <div className="create-post-holder m-0 mb-3 w-100">
      <div className="general-layout-row w-100 px-0">
        <Avatar className="d-flex align-items-center justify-content-center header-avatar" src={userAva} size="large" icon={<UserOutlined />} />
        <Input onClick={() => setIsModalVisible(true)} placeholder="Tạo bài viết công khai..." className="create-post-input" />
      </div>
      <Modal
        title="Tạo bài viết"
        destroyOnClose
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
        <span className="user-name pt-3 pb-2">Nội dung</span>
        <TextArea row="7" onChange={(e) => setContent(e.target.value)} defaultValue={content} className="w-100 p-2 textarea-text" placeholder="Nhập nội dung bài viết" />
        {isShowVideo ? (
          <>
            <span className="user-name pt-3 pb-2">Video URL</span>
            <Input onChange={addVideo} defaultValue={video} className="textarea-text" placeholder="Nhập URL video" />
          </>
        ) : null}
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
        <div className="general-layout-row justify-content-around w-100 pt-3">
          <Button onClick={() => setShowVideo(!isShowVideo)} className="w-100 btn-create-post" icon={<VideoCameraFilled size="large" style={{ color: '#dc3545' }} />}>Thêm video</Button>
        </div>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => ({
  postUpdated: state.updatePost,
  infoUpdated: state.updateUserInfo,
  listUpdated: state.updateList,
});

export default connect(mapStateToProps)(CreatePost);
