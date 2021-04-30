import React from 'react';
import ReactPlayer from 'react-player';
import { Row, Col } from 'antd';

// Render a YouTube video player
const NotiVideo = ({ video }) => (
  <Row className="w-100 my-2">
    <Col span={24}>
      <ReactPlayer
        url={video}
        controls
        width="100%"
      />
    </Col>
  </Row>
);

export default NotiVideo;
