import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'antd';
import ProfileHeader from './ProfileHeader';
import ProfileAbout from './ProfileAbout';
import changeRedirect from '../../../actions/redirectFaculty';
import { findStudent } from '../../../services/student.service';
import { getPostByPoster } from '../../../services/post.service';
import updateList from '../../../actions/updateList';
import url from '../../../utils/route';

const Profile = ({
  dispatch, id, postUpdated, listUpdated, infoUpdated,
}) => {
  const [user, setUser] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [userAva, setUserAva] = useState('');
  const [position, setPosition] = useState('');
  const [postList, setPostList] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  let currentPage = 1;
  const currentUserId = localStorage.getItem('user');
  const nodeRoot = document.getElementById('root');
  if (id === currentUserId) {
    dispatch(changeRedirect('profile'));
  } else {
    dispatch(changeRedirect('profile-someone'));
  }

  const getData = async () => {
    const dataCurrentUser = await findStudent(currentUserId);
    setCurrentUser(dataCurrentUser);
    const data = await findStudent(id);
    const posts = await getPostByPoster(data.user_id, currentPage);
    if (posts.length > 0 && currentPage !== 1) {
      setPostList(postList.concat(posts));
    } else if (currentPage === 1) {
      setPostList(posts);
    } else {
      setHasMore(false);
    }
    await dispatch(updateList(!listUpdated));
  };

  const getUserData = async () => {
    const dataCurrentUser = await findStudent(currentUserId);
    setCurrentUser(dataCurrentUser);
    const data = await findStudent(id);
    if (data.avatar.includes('public')) {
      setUserAva(`${url}${data.avatar}`);
    } else {
      setUserAva(data.avatar);
    }
    setPosition('Sinh viên');
    setUser(data);
  };

  const handleScroll = (event) => {
    const node = event.target;
    const bottom = node.scrollHeight - node.clientHeight === Math.ceil(node.scrollTop);
    if (bottom) {
      currentPage += 1;
      console.log('BOTTOM REACHED');
      console.log('post list before adding new data');
      console.log(postList);
      getData();
    }
  };

  useEffect(() => {
    getUserData();
    getData();
  }, [id, postUpdated, infoUpdated]);

  useEffect(() => {
    getData(1);
    nodeRoot.addEventListener('scroll', handleScroll);
    return () => nodeRoot.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="general-layout justify-content-start w-100 h-100">
      <Row className="general-layout w-100">
        <Col span={24} className="w-100">
          <ProfileHeader name={user.display_name} avatar={userAva} position={position} />
          <ProfileAbout hasMore={hasMore} postList={postList} user={user} currentUser={currentUser} />
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (state) => ({
  postUpdated: state.updatePost,
  listUpdated: state.updateList,
  infoUpdated: state.updateUserInfo,
});

export default connect(mapStateToProps)(Profile);
