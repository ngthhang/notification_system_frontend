import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {
  Button,
} from 'antd';
import ButtonNewPost from './ButtonNewPost';

const newPostList = [
  {
    id: 'CNdfsdfwerTT',
    student: {
      name: 'Nguyen Thuy Hang',
      avatar: '',
    },
    header: 'Thực tập đợt 1',
    content: 'Cho mình hỏi abc xyz',
    createdAt: '25/04/2021 11:00 AM',
  },
  {
    id: 'adfgsfgsfgsdf',
    student: {
      name: 'Nguyen Thuy Hang',
      avatar: '',
    },
    header: 'Thực tập đợt 1',
    content: 'Cho mình hỏi abc xyz',
    createdAt: '25/04/2021 11:00 AM',
  },
  {
    id: 'asdfs',
    student: {
      name: 'Nguyen Thuy Hang',
      avatar: 'https://images.unsplash.com/photo-1603993097397-89c963e325c7?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    },
    header: 'Thực tập đợt 1 s Thực tập đợt 1 s Thực tập đợt 1 s',
    content: 'Cho mình hỏi abc xyz',
    createdAt: '25/04/2021 11:00 AM',
  },
  {
    id: 'asdfssdfgsdfgdg',
    student: {
      name: 'Nguyen Thuy Hang',
      avatar: '',
    },
    header: 'Thực tập đợt 1 s Thực tập đợt 1 s Thực tập đợt 1 s Thực tập đợt 1 s Thực tập đợt 1 s Thực tập đợt 1 s Thực tập đợt 1 s Thực tập đợt 1 s Thực tập đợt 1 s',
    content: 'Cho mình hỏi abc xyz',
    createdAt: '25/04/2021 11:00 AM',
  },
  {
    id: 'asdfssdfgsdfgdg',
    student: {
      name: 'Nguyen Thuy Hang',
      avatar: '',
    },
    header: 'Thực tập đợt 1 s Thực tập đợt 1 s Thực tập đợt 1 s Thực tập đợt 1 s Thực tập đợt 1 s Thực tập đợt 1 s Thực tập đợt 1 s Thực tập đợt 1 s Thực tập đợt 1 s',
    content: 'Cho mình hỏi abc xyz',
    createdAt: '25/04/2021 11:00 AM',
  },
  {
    id: 'asfdfbghery',
    student: {
      name: 'Nguyen Thuy Hang',
      avatar: '',
    },
    header: 'Thực tập đợt 1 s Thực tập đợt 1 s Thực tập đợt 1 s Thực tập đợt 1 s Thực tập đợt 1 s Thực tập đợt 1 s Thực tập đợt 1 s Thực tập đợt 1 s Thực tập đợt 1 s',
    content: 'Cho mình hỏi abc xyz',
    createdAt: '25/04/2021 11:00 AM',
  },
  {
    id: 'asfdasfassdfasdfasd',
    student: {
      name: 'Nguyen Thuy Hang',
      avatar: '',
    },
    header: 'Thực tập đợt 1 s Thực tập đợt 1 s Thực tập đợt 1 s Thực tập đợt 1 s Thực tập đợt 1 s Thực tập đợt 1 s Thực tập đợt 1 s Thực tập đợt 1 s Thực tập đợt 1 s',
    content: 'Cho mình hỏi abc xyz',
    createdAt: '25/04/2021 11:00 AM',
  },
];

const NewPost = () => {
  const [redirect, enableRedirect] = useState(false);
  if (redirect) {
    return (
      <Redirect to="/category/:id" />
    );
  }

  const redirectToAllCategories = () => {
    enableRedirect(true);
    console.log('hello');
  };
  return (
    <div className="general-layout w-100 align-items-start">
      <div className="d-flex flex-row align-items-center justify-content-between w-100 my-2">
        <span className="header-text">Bài viết mới</span>
        <Button type="link" onClick={redirectToAllCategories}>Xem tất cả</Button>
      </div>
      <div className="post-holder">
        {newPostList.map((item) => (
          <ButtonNewPost key={item.id} post={item} />
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  redirectCategories: state.redirectCategories,
});

export default connect(mapStateToProps)(NewPost);
