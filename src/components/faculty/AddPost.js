import React, { Component } from 'react';
import { connect } from 'react-redux';

class AddPost extends Component {
  render() {
    return (
      <div className="d-flex">
        Add post
      </div>
    );
  }
}

export default connect()(AddPost);
