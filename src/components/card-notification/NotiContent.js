import React from 'react';
import NotiImageGroup from './NotiImageGroup';
import NotiVideo from './NotiVideo';

const NotiContent = ({ noti }) => {
  const {
    header, content, images, video,
  } = noti;
  const isHaveVideo = !!(video && video !== null && video !== '');
  return (
    <div className="card-noti-body">
      <span className="text-wrap user-name text-uppercase">{header}</span>
      <span className="text-wrap content">{content}</span>
      {isHaveVideo ? <NotiVideo video={video} /> : null }
      {images && images.length > 0 ? (
        <NotiImageGroup images={images} />
      ) : null}

    </div>
  );
};

export default NotiContent;
