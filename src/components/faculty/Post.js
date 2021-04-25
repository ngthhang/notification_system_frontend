import React, { Component } from 'react';
import { connect } from 'react-redux';

class Post extends Component {
  render() {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center bg-warning w-75">
        <span>Post</span>
      </div>
    );
  }
}

export default connect()(Post);
