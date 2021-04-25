import React, { Component } from 'react';
import { connect } from 'react-redux';
import MainPage from '../../components/faculty/MainPage';
import AdvanceHeader from '../../components/general/AdvanceHeader';
import Footer from '../../components/general/Footer';

class FacultyNewsFeedScreen extends Component {
  render() {
    return (
      <div className="general-screen h-100">
        <AdvanceHeader />
        <MainPage />
        <Footer />
      </div>
    );
  }
}

export default connect()(FacultyNewsFeedScreen);
