import React, { useState, useEffect } from 'react';
import { Spin } from 'antd';
import { connect } from 'react-redux';
import { LoadingOutlined } from '@ant-design/icons';
import CreatePost from './CreatePost';
import ListPost from '../general/profile/ListPost';
import { getAllPostByPage } from '../../services/post.service';
import updateList from '../../actions/updateList';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const NewsFeed = ({
  postUpdated, currentUser, listUpdate, dispatch,
}) => {
  const role = localStorage.getItem('role');
  const [loadingCreate, setLoadingCreate] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [postList, setPostList] = useState([]);
  const [loadingAPI, setLoadingAPI] = useState(false);
  let currentPage = 1;
  const nodeRoot = document.getElementById('root');

  const getData = async () => {
    setLoadingAPI(true);
    const posts = await getAllPostByPage(currentPage);
    setLoadingAPI(false);
    console.log(`posts at page: ${currentPage}`);
    if (posts.length > 0 && currentPage !== 1) {
      setPostList(postList.concat(posts));
      setLoadingCreate(false);
      await dispatch(updateList(!listUpdate));
    } else if (currentPage === 1) {
      setPostList(posts);
      setLoadingCreate(false);
      await dispatch(updateList(!listUpdate));
    } else {
      setHasMore(false);
    }
  };

  // const initData = async () => {
  //   const posts = await getAllPostByPage(1);
  //   setPostList(postList.concat(posts));
  //   setLoadingCreate(false);
  //   await dispatch(updateList(!listUpdate));
  // };

  const handleScroll = (event) => {
    const node = event.target;
    const bottom = node.scrollHeight - node.clientHeight === Math.ceil(node.scrollTop);
    if (bottom && !loadingAPI) {
      currentPage += 1;
      console.log('BOTTOM REACHED');
      getData();
      setTimeout(() => {
        setLoadingAPI(false);
      }, 1000);
    }
  };

  useEffect(() => {
    nodeRoot.addEventListener('scroll', handleScroll);
    return () => nodeRoot.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    getData();
  }, [postUpdated]);

  if (!loadingCreate) {
    return (
      <div className="d-flex flex-column align-items-center justify-content-start h-100 pb-5 w-100">
        {
          role !== 'admin' ? (<CreatePost user={currentUser} />) : null
        }
        <div className="w-90">
          <ListPost hasMore={hasMore} postList={postList} currentUser={currentUser} />
        </div>
      </div>
    );
  }
  return (
    <div className="general-layout h-100 w-100 mt-3">
      <Spin indicator={antIcon} />
    </div>
  );
};

const mapStateToProps = (state) => ({
  postUpdated: state.updatePost,
  listUpdate: state.updateList,
});
export default connect(mapStateToProps)(NewsFeed);
