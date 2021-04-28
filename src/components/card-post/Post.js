import React, { Component } from 'react';
import { connect } from 'react-redux';

class Post extends Component {
  render() {
    return (
      <div className="card-post">
        <span>Post</span>
      </div>
    );
  }
}

export default connect()(Post);
