import React from 'react';
import { Skeleton } from 'antd';

const CommentLoading = () => (
  <div className="card-noti-comment">
    <Skeleton.Avatar active shape="circle" />
    <Skeleton.Button className="w-75 mx-1" active shape="round" />
  </div>
);

export default CommentLoading;
