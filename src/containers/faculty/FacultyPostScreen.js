import React, { Component } from 'react';
import AddPost from '../../components/faculty/AddPost';
import AdvanceHeader from '../../components/general/AdvanceHeader';
import Footer from '../../components/general/Footer';

class FacultyScreen extends Component {
  render() {
    return (
      <div className="general-screen">
        <AdvanceHeader />
        <AddPost />
        <Footer />
      </div>
    );
  }
}

export default FacultyScreen;
