import React, { Component } from 'react';
import AddAccount from '../components/admin/AddAccount';
import Header from '../components/general/Header';
import Footer from '../components/general/Footer';

class AdminScreen extends Component {
  render() {
    return (
      <div className="general-screen">
        <Header />
        <AddAccount />
        <Footer />
      </div>
    );
  }
}

export default AdminScreen;
