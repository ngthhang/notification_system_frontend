import React, { useState, useEffect } from 'react';
import { Avatar, Button } from 'antd';
// import { Redirect } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import EditComment from './EditComment';
import CommentLoading from './CommentLoading';
import { getUser } from '../../../services/user.service';
import { findStudentByUserId } from '../../../services/student.service';

const UserComment = ({
  posterId, content, currentUser, createdAt, id, postId, postUpdated,
}) => {
  const [user, setUser] = useState({});
  const [avatar, setAvatar] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [loading, setLoading] = useState(true);
  const [redirect, setRedirect] = useState(false);
  const [studentId, setStudentId] = useState('');
  const isCurrentUser = user._id === currentUser._id;
  useEffect(async () => {
    console.log('posterid');
    console.log(posterId);
    const res = await getUser(posterId);
    setUser(res);
    if (res.avatar) {
      setName(res.display_name);
      setRole('Student');
      if (res.avatar && res.avatar.includes('public')) {
        setAvatar(`https://witty-ruby-lace.glitch.me/${res.avatar}`);
      } else {
        setAvatar(res.avatar);
      }
    } else {
      setRole('Faculty');
      setName(res.name);
    }
    setLoading(false);
  }, [postUpdated]);

  const routeProfile = async () => {
    const res = await findStudentByUserId(posterId);
    setStudentId(res.student_id);
    setRedirect(true);
  };

  if (redirect && role === 'Student') {
    const temp = 'http://localhost:3000/profile/student/';
    window.location.href = temp + studentId;
  }

  if (loading) {
    return (
      <CommentLoading />
    );
  }

  return (
    <div className="card-noti-comment">
      <Avatar src={avatar} className="d-flex align-items-center justify-content-center header-avatar" icon={<UserOutlined />} />
      <div className="content-holder">
        <div className="content">
          <span className="d-flex align-items-center justify-content-center text-wrap">
            <Button className="btn-route-profile" onClick={routeProfile} type="link"><span className="user-name route-profile">{name}</span></Button>
            {' '}
            {role === 'Faculty' ? (<span className="user-comment-tag mx-1">phòng/khoa</span>) : ''}
          </span>
          <span className="text-wrap">{content}</span>
        </div>
        <div className="d-flex flex-row w-100 align-items-start justify-content-start">
          <EditComment postId={postId} id={id} isCurrentUser={isCurrentUser} createdAt={createdAt} content={content} />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  postUpdated: state.updatePost,
});

export default connect(mapStateToProps)(UserComment);
