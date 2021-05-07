import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import { Avatar, Input, Button } from 'antd';
import { UserOutlined, SendOutlined } from '@ant-design/icons';
import { createComment } from '../../../services/post.service';
import updatePost from '../../../actions/updatePost';

const CommentInput = ({
  user, postId, postUpdated, dispatch,
}) => {
  const inputRef = useRef(null);
  const inputProps = {
    ref: inputRef,
  };
  let posterAvatar = '';
  if (user.avatar) {
    const { avatar } = user;
    if (avatar && avatar.includes('public')) {
      posterAvatar = `https://witty-ruby-lace.glitch.me/${avatar}`;
    } else {
      posterAvatar = avatar;
    }
  }
  const [comment, setComment] = useState('');

  const clearInput = () => {
    inputRef.current.state.value = '';
  };

  const postComment = async () => {
    const data = {
      post_id: postId,
      content: comment,
    };
    const res = await createComment(data);
    console.log(res);
    clearInput();
    dispatch(updatePost(!postUpdated));
  };

  return (
    <div className="card-comment-input">
      <Avatar src={posterAvatar} className="d-flex align-items-center justify-content-center header-avatar" icon={<UserOutlined />} />
      <Input
        {...inputProps}
        onPressEnter={postComment}
        onChange={(e) => setComment(e.target.value)}
        className="input-comment"
        placeholder="Viết bình luận"
      />
      <Button onClick={postComment} icon={<SendOutlined />} shape="circle" size="large" className="btn-more" />
    </div>
  );
};

const mapStateToProps = (state) => ({
  postUpdated: state.updatePost,
});

export default connect(mapStateToProps)(CommentInput);
