import React, { Component } from 'react';
import { connect } from 'react-redux';
import Profile from '../../components/general/profile/Profile';
import AdvanceHeader from '../../components/general/AdvanceHeader';
import Footer from '../../components/general/Footer';

class FacultyNewsFeedScreen extends Component {
  render() {
    return (
      <div className="general-screen">
        <AdvanceHeader />
        <Profile />
        <Footer />
      </div>
    );
  }
}

export default connect()(FacultyNewsFeedScreen);
