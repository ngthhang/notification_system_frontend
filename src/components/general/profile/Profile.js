import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Row, Col, message } from 'antd';
import ProfileHeader from './ProfileHeader';
import ProfileAbout from './ProfileAbout';
import changeRedirect from '../../../actions/redirectFaculty';
import { findStudent } from '../../../services/student.service';
import { getUser } from '../../../services/user.service';
import { getPostByPoster } from '../../../services/post.service';
import updateList from '../../../actions/updateList';

const Profile = ({
  dispatch, role, id, postUpdated, listUpdate,
}) => {
  const [user, setUser] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [userAva, setUserAva] = useState('');
  const [redirect, enableRedirect] = useState(false);
  const [position, setPosition] = useState('');
  const [postList, setPostList] = useState([]);
  // const [currentPage, setPage] = useState(1);
  useEffect(async () => {
    const currentUserRole = localStorage.getItem('role');
    const currentUserId = localStorage.getItem('user');
    if (id === currentUserId) {
      dispatch(changeRedirect('profile'));
    } else {
      dispatch(changeRedirect('profile-someone'));
    }
    let data;
    let dataCurrentUser;
    let posts;
    switch (currentUserRole) {
      case 'student':
        dataCurrentUser = await findStudent(currentUserId);
        setCurrentUser(dataCurrentUser);
        break;
      case 'faculty':
        dataCurrentUser = await getUser(currentUserId);
        setCurrentUser(dataCurrentUser);
        break;
      default:
        break;
    }
    switch (role) {
      case 'student':
        data = await findStudent(id);
        posts = await getPostByPoster(data.user_id, 1);
        if (data.code === 0) {
          message.error(data.message);
          enableRedirect(true);
          break;
        }
        if (data.avatar.includes('public')) {
          setUserAva(`https://witty-ruby-lace.glitch.me/${data.avatar}`);
        } else {
          setUserAva(data.avatar);
        }
        setUser(data);
        setPostList(posts);
        setPosition('Sinh viên');
        break;
      default:
        break;
    }
    console.log('post at newsfeed');
    console.log(posts);
    await dispatch(updateList(!listUpdate));
    return null;
  }, [postUpdated, id]);

  if (redirect) {
    return <Redirect to="/" />;
  }
  return (
    <div className="general-layout justify-content-start w-100 h-100">
      <Row className="general-layout w-100">
        <Col span={24} className="w-100">
          <ProfileHeader name={user.display_name} avatar={userAva} position={position} />
          <ProfileAbout postList={postList} user={user} currentUser={currentUser} />
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (state) => ({
  postUpdated: state.updatePost,
  listUpdate: state.updateList,
});

export default connect(mapStateToProps)(Profile);
