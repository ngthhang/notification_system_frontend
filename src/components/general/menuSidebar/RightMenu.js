import React from 'react';
import NewNotification from './NewNotification';

const RightMenu = ({ currentUser }) => (
  <div className="right-menu w-100">
    <NewNotification currentUser={currentUser} />
  </div>
);

export default RightMenu;
