import React, { Component } from 'react';
import { connect } from 'react-redux';

class MainScreen extends Component {
  render() {
    return (
      <div>
        Main screen
      </div>
    );
  }
}

export default connect()(MainScreen);
