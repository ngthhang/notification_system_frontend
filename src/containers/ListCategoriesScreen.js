import React from 'react';
import ListCategories from '../components/general/ListCategories';
import AdvanceHeader from '../components/general/AdvanceHeader';
import Footer from '../components/general/Footer';

const ListCategoriesScreen = () => (
  <div className="general-screen">
    <AdvanceHeader />
    <ListCategories />
    <Footer />
  </div>
);

export default ListCategoriesScreen;
