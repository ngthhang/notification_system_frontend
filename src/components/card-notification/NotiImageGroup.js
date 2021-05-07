import React from 'react';
import {
  Image, Row, Col,
} from 'antd';

const NotiContent = ({ images, id }) => {
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
          {images.map((item) => {
            let src;
            if (item.includes('public')) {
              src = `https://witty-ruby-lace.glitch.me/${item}`;
            } else {
              src = item;
            }
            return (
              <Col span={span} className="px-1">
                <Image key={id + images.indexOf(item)} src={src} height={span * 20} width="100%" />
              </Col>
            );
          })}
        </Row>
      </Image.PreviewGroup>
    </>
  );
};

export default NotiContent;
