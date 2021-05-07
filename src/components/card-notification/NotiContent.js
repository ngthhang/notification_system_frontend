import React from 'react';
import NotiImageGroup from './NotiImageGroup';
import NotiVideo from './NotiVideo';

const NotiContent = ({ noti }) => {
  const {
    header, content, image, video, _id,
  } = noti;
  const isHaveVideo = (video && video !== null && video !== '' && video !== undefined && video !== 'undefined');
  return (
    <div className="card-noti-body" key={noti._id}>
      <span className="text-wrap user-name text-uppercase">{header}</span>
      <span className="text-wrap content">{content}</span>
      {isHaveVideo ? <NotiVideo video={video} /> : null }
      {image && image.length > 0 ? (
        <NotiImageGroup images={image} id={_id} />
      ) : null}

    </div>
  );
};

export default NotiContent;
