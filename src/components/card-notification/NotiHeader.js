import React, { useState, useEffect } from 'react';
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
  const [newVideo, setVideo] = useState(noti.video === undefined || noti.video === 'undefined' ? null : noti.video);
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

  useEffect(() => {
    setFile([]);
    setContent(noti.content);
    setVideo(noti.video === undefined || noti.video === 'undefined' ? null : noti.video);
    setPreFile(preFile);
  }, [postUpdated]);

  const showStatus = (type, m) => {
    notification[type]({
      message: m,
      placement: 'bottomRight',
    });
  };

  const showModal = () => {
    console.log(preFile);
    setPreFile(preFile);
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    const previous_files = [];
    console.log(preFile);
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
        showStatus('error', 'url video kh??ng h???p l???');
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
    setVideo(noti.video === undefined || noti.video === 'undefined' ? null : noti.video);
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
      title: 'X??c nh???n xo?? b??i vi???t',
      icon: <ExclamationCircleOutlined />,
      content: 'B???n ch???c ch???n xo?? b??i vi???t n??y',
      okText: 'X??c nh???n',
      cancelText: 'Hu???',
      onOk() {
        deletePost();
      },
      onCancel() {
        console.log('Hu??? xo?? b??i vi???t');
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
          <span className="user-name px-2">S???a b??i vi???t</span>
        </div>
      </Menu.Item>
      <Menu.Item key="2">
        <div className="d-flex flex-row align-items-center justify-content-start py-2">
          <Button className="general-layout btn-dropdown" shape="circle" icon={<DeleteOutlined />} />
          <span className="user-name px-2">Xo?? b??i vi???t</span>
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
        title="S???a b??i vi???t"
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
        <span className="user-name pt-3 pb-2">N???i dung</span>
        <TextArea row="7" onChange={(e) => setContent(e.target.value)} className="w-100 p-2 textarea-text" defaultValue={newContent} placeholder="Nh???p n???i dung b??i vi???t" />
        <span className="user-name pt-3 pb-2">Video URL</span>
        <Input onChange={addVideo} defaultValue={newVideo} className="textarea-text" placeholder="Nh???p URL video" />
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
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => ({
  postUpdated: state.updatePost,
  redirectFaculty: state.redirectFaculty,
});

export default connect(mapStateToProps)(NotiHeader);
