import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import {
  Avatar, Input, Button, notification,
} from 'antd';
import { UserOutlined, SendOutlined } from '@ant-design/icons';
import { createComment } from '../../../services/post.service';
import updatePost from '../../../actions/updatePost';
import url from '../../../utils/route';

const CommentInput = ({
  user, postId, postUpdated, dispatch,
}) => {
  const inputRef = useRef(null);
  const inputProps = {
    ref: inputRef,
  };
  let posterAvatar = '';
  const role = localStorage.getItem('role');
  if (role === 'student') {
    const { avatar } = user;
    if (avatar && avatar.includes('public')) {
      posterAvatar = `${url}${avatar}`;
    } else {
      posterAvatar = avatar;
    }
  }
  const [comment, setComment] = useState('');

  const clearInput = () => {
    inputRef.current.state.value = '';
  };

  const showStatus = (type, m) => {
    notification[type]({
      message: m,
      placement: 'bottomRight',
    });
  };

  const postComment = async () => {
    const data = {
      post_id: postId,
      content: comment,
    };
    const res = await createComment(data);
    clearInput();
    if (res.code === 1) {
      showStatus('success', 'Bình luận thành công');
      dispatch(updatePost(!postUpdated));
    } else {
      showStatus('error', 'Bình luận thất bại');
    }
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
