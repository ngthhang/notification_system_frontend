import React, { useState, useEffect } from 'react';
import { Divider, Button } from 'antd';
import { connect } from 'react-redux';
import UserComment from './UserComment';
import CommentInput from './CommentInput';
import updateEachComment from '../../../actions/updateEachComment';
import deleteComment from '../../../actions/deleteComment';

const ListComment = ({
  postId, comments, totalComment, commentUpdated, currentUser, eachCommentUpdated, dispatch, commentDeleted,
}) => {
  const [isShowComment, showComment] = useState(false);
  const [currentShowComments, setShowComments] = useState(comments);

  const showMoreComment = () => {
    setShowComments(totalComment);
  };

  useEffect(() => {
    setShowComments(comments);
    // console.log('list comment');
    // console.log(comments);
    if (comments.length <= 0 && commentDeleted) {
      showComment(false);
      dispatch(deleteComment(false));
    }

    dispatch(updateEachComment(!eachCommentUpdated));
  }, [commentUpdated]);

  return (
    <div className="card-noti-comment-list">
      <Button type="link" onClick={() => showComment(!isShowComment)} className="align-self-end">
        <span className="count-text">
          {totalComment.length !== undefined ? totalComment.length : 0}
          {' '}
          bình luận
        </span>
      </Button>
      <Divider type="horizontal" className="my-2" />
      <CommentInput postId={postId} user={currentUser} />
      {isShowComment ? (
        <>
          {currentShowComments && currentShowComments.length > 0 && totalComment.length !== undefined
            && currentShowComments.map((item) => (
              <UserComment postId={postId} id={item._id} key={item._id} posterId={item.poster} content={item.content} createdAt={item.create_at} currentUser={currentUser} />
            ))}
          <Button type="link" onClick={showMoreComment} className="more-comment">
            <span className="text-more">Xem thêm bình luận</span>
          </Button>
        </>
      ) : null}
    </div>
  );
};
const mapStateToProps = (state) => ({
  commentUpdated: state.updateComment,
  commentDeleted: state.deleteComment,
  eachCommentUpdated: state.updateEachComment,
});

export default connect(mapStateToProps)(ListComment);
