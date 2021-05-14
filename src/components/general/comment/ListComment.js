import React, { useState, useEffect } from 'react';
import { Divider, Button } from 'antd';
import { connect } from 'react-redux';
import UserComment from './UserComment';
import CommentInput from './CommentInput';

const ListComment = ({
  postId, comments, totalComment, commentUpdated, currentUser,
}) => {
  const [isShowComment, showComment] = useState(false);
  const [currentShowComments, setShowComments] = useState(comments);

  useEffect(() => {
    setShowComments(comments);
  }, [commentUpdated]);

  const showMoreComment = () => {
    setShowComments(totalComment);
  };

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
          {currentShowComments && currentShowComments.length > 0
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
});

export default connect(mapStateToProps)(ListComment);
