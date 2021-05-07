import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import changeRedirect from '../actions/redirectFaculty';
import AdvanceHeader from '../components/general/AdvanceHeader';
import Footer from '../components/general/Footer';

const CategoriesDetail = ({ aliasKey, dispatch }) => {
  const [category, setCategory] = useState(aliasKey);

  useEffect(() => {
    dispatch(changeRedirect('categories-detail'));
    setCategory('hello');
  }, []);

  return (
    <div className="general-layout">
      <AdvanceHeader />
      <span>{category}</span>
      <Footer />
    </div>
  );
};

const mapStateToProps = (state) => ({
  redirectFaculty: state.redirectFaculty,
});

export default connect(mapStateToProps)(CategoriesDetail);
