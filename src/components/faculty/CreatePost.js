import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  Modal, Avatar, Input, Button, Upload, message, Select, notification,
} from 'antd';
import {
  UserOutlined, PlusOutlined, VideoCameraFilled,
} from '@ant-design/icons';
import updatePost from '../../actions/updatePost';
import updateNoti from '../../actions/updateNoti';
import { createPost } from '../../services/post.service';
import { createNoti } from '../../services/notification.service';
import urlRoute from '../../utils/route';

const { TextArea } = Input;
const { Option } = Select;

const CreatePost = ({
  user, postUpdated, dispatch, notiUpdated,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isShowVideo, setShowVideo] = useState(false);
  const [currentFile, setFile] = useState([]);
  const [content, setContent] = useState('');
  const [userAva, setUserAva] = useState('');
  const [video, setVideo] = useState('');
  const role = localStorage.getItem('role');
  const isStudent = role === 'student';
  const [userCate, setUserCate] = useState([]);
  const [currentCate, setCurrentCate] = useState('');
  const [header, setHeader] = useState('');

  useEffect(async () => {
    if (isStudent) {
      if (user.avatar.includes('public')) {
        setUserAva(`${urlRoute}${user.avatar}`);
      } else {
        setUserAva(user.avatar);
      }
    } else {
      setUserCate(user.category_id);
    }
  }, []);

  const addVideo = (e) => {
    const url = e.target.value;
    setVideo(url);
  };

  const showStatusCreate = (type, m) => {
    notification[type]({
      message: m,
      placement: 'bottomRight',
    });
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
        message.error('Url video kh??ng h???p l???');
        setVideo('');
        return;
      }
    }
    const res = await createPost(data);
    console.log(res);
    if (res.code === 1) {
      showStatusCreate('success', 'T???o b??i vi???t m???i th??nh c??ng');
    } else {
      showStatusCreate('fail', 'T???o b??i vi???t m???i th???t b???i');
    }
    setIsModalVisible(false);
    setContent('');
    setFile([]);
    setContent('');
    setHeader('');
    setCurrentCate('');
    setVideo('');
    setShowVideo(false);
    dispatch(updatePost(!postUpdated));
  };

  const handleCreateNoti = async () => {
    const { _id } = user;
    const data = {
      poster: _id,
      attachment: currentFile,
      category_id: currentCate,
      content,
      header,
    };
    console.log(data);
    const res = await createNoti(data);
    console.log(res);
    if (res.code === 1) {
      showStatusCreate('success', 'T???o th??ng b??o m???i th??nh c??ng');
    } else {
      showStatusCreate('fail', 'T???o th??ng b??o m???i th???t b???i');
    }
    setIsModalVisible(false);
    setContent('');
    setFile([]);
    setContent('');
    setHeader('');
    setCurrentCate('');
    setVideo('');
    setShowVideo(false);
    dispatch(updateNoti(!notiUpdated));
  };

  const handleOk = () => {
    console.log(currentFile);
    if (isStudent) {
      return handleCreatePost();
    }
    return handleCreateNoti();
  };

  const handleCancel = () => {
    setContent('');
    setFile([]);
    setContent('');
    setHeader('');
    setCurrentCate('');
    setVideo('');
    setShowVideo(false);
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

  const onChange = (value) => {
    setCurrentCate(value);
  };

  return (
    <div className="create-post-holder">
      <div className="general-layout-row w-100 px-0">
        <Avatar className="d-flex align-items-center justify-content-center header-avatar" src={userAva} size="large" icon={<UserOutlined />} />
        <Input onClick={() => setIsModalVisible(true)} placeholder={isStudent ? 'T???o b??i vi???t c??ng khai...' : 'T???o th??ng b??o...'} className="create-post-input" />
      </div>
      <Modal
        title={isStudent ? 'T???o b??i vi???t' : 'T???o th??ng b??o'}
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
        closable
        destroyOnClose
        onCancel={handleCancel}
      >
        {
          !isStudent ? (
            <>
              <span className="user-name pb-2">Chuy??n m???c</span>
              <Select
                showSearch
                style={{ width: '100%' }}
                size="large"
                className="textarea-text"
                placeholder="Ch???n chuy??n m???c ????? ????ng b??i"
                optionFilterProp="children"
                onChange={onChange}
                filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              >
                {userCate.length > 0 && userCate.map((item) => (
                  <Option key={item._id} value={item._id} className="textarea-text">{item.name}</Option>
                ))}
              </Select>
              <span className="user-name pt-3 pb-2">Ti??u ?????</span>
              <Input className="textarea-text" onChange={(e) => setHeader(e.target.value)} placeholder="Nh???p ti??u ????? th??ng b??o" />
            </>
          ) : null
      }
        <span className="user-name pt-3 pb-2">N???i dung</span>
        <TextArea row="7" onChange={(e) => setContent(e.target.value)} className="w-100 p-2 textarea-text" placeholder="Nh???p n???i dung" />
        {isShowVideo ? (
          <>
            <span className="user-name pt-3 pb-2">Video URL</span>
            <Input onChange={addVideo} defaultValue={video} className="textarea-text" placeholder="Nh???p URL video" />
          </>
        ) : null}
        <span className="user-name pt-3 pb-2">H??nh ???nh ????nh k??m</span>
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
        {isStudent ? (
          <div className="general-layout-row justify-content-around w-100 pt-3">
            <Button onClick={() => setShowVideo(!isShowVideo)} className="w-100 btn-create-post" icon={<VideoCameraFilled size="large" style={{ color: '#dc3545' }} />}>Th??m video</Button>
          </div>
        ) : null}
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => ({
  postUpdated: state.updatePost,
  notiUpdated: state.updateNoti,
});

export default connect(mapStateToProps)(CreatePost);
