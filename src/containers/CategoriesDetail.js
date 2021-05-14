import React from 'react';
import { connect } from 'react-redux';
import ListNotiCategoriesDetail from '../components/categories/ListNotiCategoriesDetail';
import changeRedirect from '../actions/redirectFaculty';

const CategoriesDetail = ({ match, dispatch }) => {
  const { aliasKey } = match.params;
  dispatch(changeRedirect('categories-detail'));
  return (
    <ListNotiCategoriesDetail aliasKey={aliasKey} />
  );
};

export default connect()(CategoriesDetail);
