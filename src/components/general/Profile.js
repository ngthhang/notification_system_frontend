import React, { Component } from 'react';
import { connect } from 'react-redux';

class Profile extends Component {
  render() {
    return (
      <div>
        <span>Profile</span>
      </div>
    );
  }
}

export default connect()(Profile);
