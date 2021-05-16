import React from 'react';
import CreatePost from './CreatePost';
import ListPost from './ListPost';

const ProfileListPost = ({
  isCurrentUser, user, postList, currentUser, hasMore,
}) => (
  <>
    { isCurrentUser ? <CreatePost user={user} /> : null}
    <ListPost postList={postList} currentUser={currentUser} user={user} hasMore={hasMore} />
  </>
);

export default ProfileListPost;
