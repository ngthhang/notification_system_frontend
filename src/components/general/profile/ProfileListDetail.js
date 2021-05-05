import React from 'react';
import ProfileAboutDetail from './ProfileAboutDetail';

const ProfileListDetail = ({
  faculty, studentId, email, studentClass,
}) => (
  <>
    <ProfileAboutDetail type="faculty" value={faculty} />
    <ProfileAboutDetail type="" value={studentClass} />
    <ProfileAboutDetail type="id" value={studentId} />
    <ProfileAboutDetail type="email" value={email} />
  </>
);

export default ProfileListDetail;
