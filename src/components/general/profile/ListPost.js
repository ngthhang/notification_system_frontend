import React, { Component } from 'react';
import { connect } from 'react-redux';
import Noti from '../../card-notification/Noti';

const postList = [
  {
    id: 'asdfasdf',
    type: 'post',
    poster: {
      type: 'student',
      name: 'Nguyen Thuy Hang',
      avatar: '',
    },
    createdAt: '25/04/2021 11:00 AM',
    header: 'Thực tập đợt 1 s Thực tập đợt 1 s Thực tập đợt 1 s Thực tập đợt 1 s',
    content: 'Cho mình hỏi abc xyz',
    images: ['https://images.unsplash.com/photo-1619448473282-bdcea8020cdd?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', 'https://images.unsplash.com/photo-1619617345083-9f3857455d2e?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', 'https://images.unsplash.com/photo-1619553405540-f828de98c66e?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxNXx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'],
    video: 'https://www.youtube.com/watch?v=ysz5S6PUM-U',
  },
  {
    id: 'asdfasdf',
    type: 'noti',
    poster: {
      type: 'category',
      name: 'Khoa Công nghệ thông tin',
      aliasKey: 'CNTT',
    },
    createdAt: '25/04/2021 11:00 AM',
    header: 'Thực tập đợt 1 s Thực tập đợt 1 s Thực tập đợt 1 s Thực tập đợt 1 s',
    content: 'Cho mình hỏi abc xyz',
    images: [],
    video: '',
  },
  {
    id: '111ádfádf',
    type: 'noti',
    poster: {
      type: 'category',
      name: 'Khoa Công nghệ thông tin',
      aliasKey: 'CNTT',
    },
    createdAt: '25/04/2021 11:00 AM',
    header: 'Thực tập đợt 1 s Thực tập đợt 1 s Thực tập đợt 1 s Thực tập đợt 1 s',
    content: 'Cho mình hỏi abc xyz',
    images: [],
    video: '',
  },
];

class ListPost extends Component {
  render() {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center w-100">
        {postList.map((item) => (
          <Noti noti={item} key={item.id} />
        ))}
      </div>
    );
  }
}

export default connect()(ListPost);
