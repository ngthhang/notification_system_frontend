import React, { useState, useEffect } from 'react';
import { Spin } from 'antd';
import { connect } from 'react-redux';
import { LoadingOutlined } from '@ant-design/icons';
import CreatePost from './CreatePost';
import ListPost from '../general/profile/ListPost';
import { getAllPostByPage } from '../../services/post.service';
import updateList from '../../actions/updateList';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const role = localStorage.getItem('role');
const nodeRoot = document.getElementById('root');
let currentPage = 1;
let postHere = [];

const NewsFeed = ({
  postUpdated, currentUser, listUpdate, dispatch,
}) => {
  const [loadingCreate, setLoadingCreate] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [postList, setPostList] = useState([]);
  console.log(currentPage);
  const getData = async () => {
    const posts = await getAllPostByPage(currentPage);
    console.log(`posts at page: ${currentPage}`);
    if (posts.length > 0 && currentPage !== 1) {
      setPostList(postHere.concat(posts));
      postHere = postHere.concat(posts);
      setLoadingCreate(false);
      await dispatch(updateList(!listUpdate));
    } else if (currentPage === 1) {
      setPostList(posts);
      postHere = posts;
      setLoadingCreate(false);
      await dispatch(updateList(!listUpdate));
    } else {
      setHasMore(false);
    }
  };

  const handleScroll = (event) => {
    const node = event.target;
    const bottom = node.scrollHeight - node.clientHeight === Math.ceil(node.scrollTop);
    if (bottom) {
      currentPage += 1;
      console.log(currentPage);
      console.log('BOTTOM REACHED');
      getData();
    }
  };

  useEffect(() => {
    currentPage = 1;
    nodeRoot.addEventListener('scroll', handleScroll);
    return () => nodeRoot.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    currentPage = 1;
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
