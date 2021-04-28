import React from 'react';
import { connect } from 'react-redux';
import NotiHeader from './NotiHeader';
import NotiContent from './NotiContent';
import ListComment from '../general/comment/ListComment';

const Noti = (props) => {
  const { noti } = props;
  const { poster } = noti;
  return (
    <div className="card-noti">
      <NotiHeader poster={poster} createdAt={noti.createdAt} />
      <NotiContent noti={noti} />
      <ListComment />
    </div>
  );
};

export default connect()(Noti);
