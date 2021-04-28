import React, { useState } from 'react';
import { Divider, Button } from 'antd';
import UserComment from './UserComment';
import CommentInput from './CommentInput';

const comments = [
  {
    id: 'asdfaertio',
    user: {
      role: 'student',
      name: 'Nguyen Thuy Hang',
      avatar: '',
      id: '12331252345',
    },
    content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer',
  },
  {
    id: 'adddd',
    user: {
      role: 'student',
      name: 'Nguyen Thuy Hang',
      avatar: '',
      id: '123',
    },
    content: 'asdfjklhalfhlafh',
  },
  {
    id: 'asdfaertsghlkeio',
    user: {
      role: 'student',
      name: 'Nguyen Thuy Hang',
      avatar: '',
      id: '12331252345',
    },
    content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
  },
  {
    id: '112asdfaertsghlkeio',
    user: {
      role: 'faculty',
      name: 'Nguyen Trung',
      avatar: '',
      id: '12331252345',
    },
    content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
  },
];

const currentUser = {
  avatar: '',
  id: '123',
  name: 'Nguyen Thuy Hang',
};

const ListComment = () => {
  const [isShowComment, showComment] = useState(false);
  return (
    <div className="card-noti-comment-list">
      <Button type="link" onClick={() => showComment(!isShowComment)} className="align-self-end"><span className="count-text">6 bình luận</span></Button>
      <Divider type="horizontal" className="my-2" />
      <CommentInput user={currentUser} />
      {isShowComment ? (
        <>
          {
        comments.map((item) => (
          <UserComment key={item.id} user={item.user} content={item.content} />
        ))
      }
          <div className="more-comment">
            <span className="text-more">Xem thêm bình luận</span>
            <span className="text-count">3/12</span>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default ListComment;
