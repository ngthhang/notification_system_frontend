import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import NotiHeader from './NotiHeader';
import NotiContent from './NotiContent';
import NotiLoading from './NotiLoading';
import ListComment from '../general/comment/ListComment';
import { getPosterById, getCommentsByPostId } from '../../services/post.service';

const Noti = (props) => {
  const {
    noti, postUpdated, currentUser,
  } = props;
  const { comments } = noti;
  const [posterObj, setPosterObj] = useState({});
  const [type, setType] = useState('student');
  const [totalComment, setTotalComment] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    const res = await getPosterById(noti.poster);
    const resComment = await getCommentsByPostId(noti._id);
    if (!noti.categories || noti.categories === undefined || noti.categories === null) {
      setType('student');
    }
    setPosterObj(res);
    setTotalComment(resComment);
    setLoading(false);
  }, [postUpdated]);

  if (loading) {
    return (
      <NotiLoading />
    );
  }

  return (
    <div className="card-noti">
      <NotiHeader poster={posterObj} noti={noti} postId={noti._id} posterType={type} createdAt={noti.create_at} />
      <NotiContent noti={noti} />
      <ListComment postId={noti._id} totalComment={totalComment} currentUser={currentUser} comments={comments} />
    </div>
  );
};

const mapStateToProps = (state) => ({
  postUpdated: state.updatePost,
  commentUpdated: state.updateComment,
});

export default connect(mapStateToProps)(Noti);
