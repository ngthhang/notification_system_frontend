import React from 'react';
import { connect } from 'react-redux';
import ListNotiCategoriesDetail from '../components/categories/ListNotiCategoriesDetail';

const CategoriesDetail = ({ match }) => {
  const { aliasKey } = match.params;
  return (
    <ListNotiCategoriesDetail aliasKey={aliasKey} />
  );
};

const mapStateToProps = (state) => ({
  redirectFaculty: state.redirectFaculty,
});

export default connect(mapStateToProps)(CategoriesDetail);
