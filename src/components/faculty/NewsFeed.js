import React, { Component } from 'react';
import { connect } from 'react-redux';
import ListPost from './ListPost';
import CreatePost from './CreatePost';

class NewsFeed extends Component {
  render() {
    return (
      <div className="d-flex flex-column align-items-center justify-content-start h-100 pb-5">
        <CreatePost />
        <ListPost />
      </div>
    );
  }
}

export default connect()(NewsFeed);
