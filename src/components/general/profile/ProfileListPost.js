import React from 'react';
import CreatePost from './CreatePost';
import ListPost from './ListPost';

const ProfileListPost = () => {
  const isCurrentUser = true;
  return (
    <>
      { isCurrentUser ? <CreatePost /> : null}
      <ListPost />
    </>
  );
};

export default ProfileListPost;
