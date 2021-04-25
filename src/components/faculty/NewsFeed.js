import React, { Component } from 'react';
import { connect } from 'react-redux';
import Post from './Post';

class NewsFeed extends Component {
  render() {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center newsfeed-holder bg-newsfeed py-5">
        <Post />
      </div>
    );
  }
}

export default connect()(NewsFeed);
