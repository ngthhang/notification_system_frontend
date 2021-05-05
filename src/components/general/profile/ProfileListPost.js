import React from 'react';
import CreatePost from './CreatePost';
import ListPost from './ListPost';

const ProfileListPost = ({ isCurrentUser, user }) => (
  <>
    { isCurrentUser ? <CreatePost user={user} /> : null}
    <ListPost user={user} />
  </>
);

export default ProfileListPost;
