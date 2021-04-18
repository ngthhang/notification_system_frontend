import React, { Component } from 'react';
import { connect } from 'react-redux';

class ForgotPassword extends Component {
  render() {
    return (
      <div className="d-flex">
        For got password
      </div>
    );
  }
}

export default connect()(ForgotPassword);
