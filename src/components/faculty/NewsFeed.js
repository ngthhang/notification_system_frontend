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
  const currentPage = 1;
  // const [currentPage, setPage] = useState(1);
  // const nodeRoot = document.getElementById('root');
  // const [referenceNode, setReferenceNode] = useState();

  // const handleScroll = (event) => {
  //   const node = event.target;
  //   const bottom = node.scrollHeight - node.clientHeight === Math.ceil(node.scrollTop);
  //   if (bottom) {
  //     console.log('BOTTOM REACHED');
  //     console.log(currentPage);
  //     console.log(postList);
  //   }
  // };

  // const paneDidMount = (node) => {
  //   if (node && postList.length > 0) {
  //     node.addEventListener('scroll', handleScroll);
  //     setReferenceNode(node);
  //   }
  // };

  useEffect(async () => {
    const posts = await getAllPostByPage(currentPage);
    console.log(`posts at page: ${currentPage}`);
    console.log(posts);
    if (posts.length > 0) {
      // setPostList(postList.concat(posts));
      setPostList(posts);
    } else {
      // paneDidMount(nodeRoot);
      setHasMore(false);
    }
    setLoadingCreate(false);
    await dispatch(updateList(!listUpdate));
    return () => referenceNode.removeEventListener('scroll', handleScroll);
  }, [postUpdated]);

  if (!loadingCreate) {
    return (
      <div className="d-flex flex-column align-items-center justify-content-start h-100 pb-5 w-100">
        {
          role !== 'admin' ? (<CreatePost user={currentUser} />) : null
        }
        <div className="w-90">
          <ListPost postList={postList} currentUser={currentUser} />
        </div>
        {!hasMore ? (
          <div className="w-100 general-layout h-100">
            <span className="my-4">Không còn bài viết hiển thị</span>
          </div>
        ) : null}
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
