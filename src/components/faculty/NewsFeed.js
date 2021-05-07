import React, { useState, useEffect } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin, message } from 'antd';
import InfiniteScroll from 'react-infinite-scroller';
import { connect } from 'react-redux';
import CreatePost from './CreatePost';
import ListPost from '../general/profile/ListPost';
import { getUser } from '../../services/user.service';
import { findStudent } from '../../services/student.service';
import { getAllPostByPage } from '../../services/post.service';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const NewsFeed = ({ postUpdated }) => {
  const [currentUser, setCurrentUser] = useState({});
  const [loadingCreate, setLoadingCreate] = useState(true);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [postList, setPostList] = useState(true);
  const [currentPage, setPage] = useState(1);
  const currentUserRole = localStorage.getItem('role');
  const currentUserId = localStorage.getItem('user');
  let dataCurrentUser;

  const checkScroll = () => {
    window.onscroll = () => {
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        console.log('eee');
      }
    };
  };

  useEffect(async () => {
    switch (currentUserRole) {
      case 'student':
        dataCurrentUser = await findStudent(currentUserId);
        break;
      case 'faculty':
        dataCurrentUser = await getUser(currentUserId);
        break;
      case 'admin':
        dataCurrentUser = await getUser(currentUserId);
        break;
      default:
        break;
    }
    const posts = await getAllPostByPage(currentPage);
    setPostList(posts);
    setCurrentUser(dataCurrentUser);
    setLoadingCreate(false);
    setLoading(false);
    checkScroll();
  }, [postUpdated]);

  if (loadingCreate) {
    return (
      <div className="d-flex flex-column align-items-center justify-content-start h-100 pb-5 w-100 h-100">
        <Spin indicator={antIcon} />
      </div>
    );
  }

  const handleInfiniteOnLoad = async () => {
    setLoading(true);
    setPage(currentPage + 1);
    const res = await getAllPostByPage(currentPage);
    if (res.length <= 0) {
      message.warning('Infinite List loaded all');
      setLoading(false);
      setHasMore(false);
      return;
    }
    console.log('hêh');
    setPostList(postList.concat(res));
    setLoading(false);
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-start h-100 pb-5 w-100">
      <CreatePost user={currentUser} />
      <div className="w-90 scroll-content">
        <InfiniteScroll
          initialLoad={false}
          pageStart={0}
          loadMore={handleInfiniteOnLoad}
          hasMore={!loading && hasMore}
          useWindow
        >
          <ListPost postList={postList} currentUser={currentUser} />
        </InfiniteScroll>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  postUpdated: state.updatePost,
});

export default connect(mapStateToProps)(NewsFeed);
