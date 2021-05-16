import React from 'react';
import {
  Image, Row, Col,
} from 'antd';
import url from '../../utils/route';

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
              src = `${url}${item}`;
            } else {
              src = item;
            }
            return (
              <Col key={id + images.indexOf(item)} span={span} className="px-1">
                <Image src={src} height="auto" width="100%" />
              </Col>
            );
          })}
        </Row>
      </Image.PreviewGroup>
    </>
  );
};

export default NotiContent;
