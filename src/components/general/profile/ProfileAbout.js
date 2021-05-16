import React, { useState, useEffect } from 'react';
import {
  Row, Col, Divider, Button, Modal, Input, Upload, notification,
} from 'antd';
import { connect } from 'react-redux';
import { UploadOutlined } from '@ant-design/icons';
import { updateStudent } from '../../../services/student.service';
import ProfileListDetail from './ProfileListDetail';
import ProfileListPost from './ProfileListPost';
import updateUserInfo from '../../../actions/updateUserInfo';
import updatePost from '../../../actions/updatePost';

const ProfileAbout = ({
  user, postList, infoUpdated, currentUser, dispatch, postUpdated, hasMore,
}) => {
  const [isModalVisible, showModal] = useState(false);
  const [faculty, changeFaculty] = useState('');
  const [studentClass, changeClass] = useState('');
  const [currentFile, setFile] = useState('');
  const studentId = localStorage.getItem('user');
  const isCurrentUser = studentId === user.student_id;

  useEffect(() => {
    changeFaculty(user.faculty_name);
    changeClass(user.class_name);
  }, [infoUpdated]);

  const showStatus = (type, message) => {
    notification[type]({
      message,
      placement: 'bottomRight',
    });
  };

  const handleOk = async () => {
    let data;
    const notEditFaculty = faculty === undefined || faculty === 'undefined';
    const notEditClass = studentClass === undefined || studentClass === 'undefined';

    // faculty undefined
    if (notEditFaculty && !notEditClass) {
      console.log('class');
      data = {
        editBoth: 0,
        class_name: studentClass,
        avatar: currentFile,
      };
    }

    // class undefined
    if (notEditClass && !notEditFaculty) {
      console.log('faculty');
      data = {
        editBoth: 1,
        faculty_name: faculty,
        avatar: currentFile,
      };
    }

    if (!notEditFaculty && !notEditClass) {
      console.log('object');
      data = {
        editBoth: 2,
        class_name: studentClass,
        faculty_name: faculty,
        avatar: currentFile,
      };
    } else {
      data = {
        editBoth: 3,
        avatar: currentFile,
      };
    }
    const res = await updateStudent(data, user.student_id);
    dispatch(updateUserInfo(!infoUpdated));
    dispatch(updatePost(!postUpdated));
    const { code, message } = res;
    console.log(res.student);
    if (code === 1) {
      showStatus('success', message);
    } else {
      showStatus('error', message);
    }
    showModal(false);
  };

  const handleCancel = () => {
    showModal(false);
  };

  const props = {
    onRemove: () => {
      setFile('');
    },
    beforeUpload: (file) => {
      setFile(file);
      return false;
    },
    currentFile,
  };

  return (
    <>
      <Row className="align-items-start w-100 h-100 py-4">
        <Col offset={1} span={7} xs={22} md={22} lg={7} className="mb-4 w-100 profile-about bg-white p-4">
          <span className="header">Giới thiệu</span>
          <Divider type="horizontal" />
          <ProfileListDetail faculty={user.faculty_name} studentId={user.student_id} studentClass={user.class_name} email={user.email} />
          {isCurrentUser ? <Button onClick={() => showModal(true)} className="btn-change-avatar mb-3">Chỉnh sửa chi tiết</Button> : null}
        </Col>
        <Col offset={1} span={14} xs={22} md={22} lg={14}>
          <ProfileListPost currentUser={currentUser} postList={postList} user={user} isCurrentUser={isCurrentUser} hasMore={hasMore} />
        </Col>
      </Row>
      <Modal
        title="Thay đổi thông tin cá nhân"
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
        destroyOnClose
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <span className="user-name pt-3 pb-2">Lớp</span>
        <Input className="textarea-text" onChange={(e) => changeClass(e.target.value)} placeholder="Nhập lớp của bạn" defaultValue={user.class_name !== 'undefined' ? user.class_name : null} />
        <span className="user-name pt-3 pb-2">Khoa</span>
        <Input className="textarea-text" onChange={(e) => changeFaculty(e.target.value)} placeholder="Nhập khoa của bạn" defaultValue={user.faculty_name !== 'undefined' ? user.faculty_name : null} />
        <Upload
          {...props}
          maxCount={1}
          listType="picture"
        >
          <Button className="btn-create-post w-100 my-2" icon={<UploadOutlined />}>Chỉnh sửa ảnh đại diện</Button>
        </Upload>
      </Modal>

    </>
  );
};

const mapStateToProps = (state) => ({
  infoUpdated: state.updateUserInfo,
  postUpdated: state.updatePost,
});

export default connect(mapStateToProps)(ProfileAbout);
