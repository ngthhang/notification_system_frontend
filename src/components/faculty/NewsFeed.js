import React, { useState, useEffect } from 'react';
import { message } from 'antd';
import InfiniteScroll from 'react-infinite-scroller';
import { connect } from 'react-redux';
import CreatePost from './CreatePost';
import ListPost from '../general/profile/ListPost';
import { getAllPostByPage } from '../../services/post.service';
import updateList from '../../actions/updateList';

const NewsFeed = ({
  postUpdated, currentUser, listUpdate, dispatch,
}) => {
  const role = localStorage.getItem('role');
  const [loadingCreate, setLoadingCreate] = useState(true);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [postList, setPostList] = useState(true);
  const [currentPage, setPage] = useState(1);

  const checkScroll = () => {
    window.onscroll = () => {
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        console.log('eee');
      }
    };
  };

  useEffect(async () => {
    const posts = await getAllPostByPage(currentPage);
    setPostList(posts);
    setLoadingCreate(false);
    setLoading(false);
    checkScroll();
    await dispatch(updateList(!listUpdate));
  }, [postUpdated]);

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
    setPostList(postList.concat(res));
    setLoading(false);
  };

  if (!loadingCreate) {
    return (
      <div className="d-flex flex-column align-items-center justify-content-start h-100 pb-5 w-100">
        {
          role !== 'admin' ? (<CreatePost user={currentUser} />) : null
        }
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
  }
  return null;
};

const mapStateToProps = (state) => ({
  postUpdated: state.updatePost,
  listUpdate: state.updateList,
});

export default connect(mapStateToProps)(NewsFeed);
