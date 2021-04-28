import React, { useState } from 'react';
import { Avatar, Input, Button } from 'antd';
import { UserOutlined, SendOutlined } from '@ant-design/icons';

const CommentInput = () => {
  const [comment, setComment] = useState('');

  const postComment = () => {
    console.log(comment);
  };

  const showMore = () => {
    console.log('hello');
  };

  return (
    <div className="card-comment-input">
      <Avatar className="d-flex align-items-center justify-content-center header-avatar" icon={<UserOutlined />} />
      <Input onPressEnter={postComment} onHover={showMore} onChange={(e) => setComment(e.target.value)} className="input-comment" placeholder="Viết bình luận" />
      <Button onClick={postComment} icon={<SendOutlined />} shape="circle" size="large" className="btn-more" />
    </div>
  );
};

export default CommentInput;
