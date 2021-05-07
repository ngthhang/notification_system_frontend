import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Noti from '../../card-notification/Noti';
import updateComment from '../../../actions/updateComment';

const ListPost = ({
  postList, dispatch, commentUpdated, listUpdate, currentUser,
}) => {
  useEffect(async () => {
    await dispatch(updateComment(!commentUpdated));
  }, [listUpdate]);
  return (
    <div className="d-flex flex-column align-items-center justify-content-center w-100">
      {postList && postList.length > 0 ? postList.map((item) => (
        <Noti noti={item} key={item._id} currentUser={currentUser} />
      )) : (<span className="d-flex align-items-center justify-content-center my-2 w-100">Chưa có bài viết mới</span>)}
    </div>
  );
};

const mapStateToProps = (state) => ({
  postUpdated: state.updatePost,
  commentUpdated: state.updateComment,
  listUpdate: state.updateList,
});

export default connect(mapStateToProps)(ListPost);
