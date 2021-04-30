import React from 'react';
import {
  Image, Row, Col,
} from 'antd';

const NotiContent = ({ images }) => {
  const len = images.length;
  let span = 12;
  if (len === 1) {
    span = 24;
  } else if (len % 2 === 0) {
    span = 12;
  }
  return (
    <>
      <Image.PreviewGroup className="w-100 my-2">
        <Row className="w-100 my-2">
          {images.map((item) => (
            <Col span={span} className="px-1">
              <Image src={item} height={200} />
            </Col>
          ))}
        </Row>
      </Image.PreviewGroup>
    </>
  );
};

export default NotiContent;
