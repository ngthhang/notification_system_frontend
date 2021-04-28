import React from 'react';
import { Image, Row, Col } from 'antd';

const NotiContent = ({ noti }) => {
  const { header, content, images } = noti;
  return (
    <div className="card-noti-body">
      <span className="text-wrap user-name text-uppercase">{header}</span>
      <span className="text-wrap content">{content}</span>
      {images && images.length > 0 ? (
        <Row className="py-2">
          <Image.PreviewGroup>
            {images.map((item) => (
              <Col span={12} className="col-img">
                <Image
                  className="pt-2 px-1"
                  src={item}
                />
              </Col>
            ))}
          </Image.PreviewGroup>
        </Row>
      ) : null}
    </div>
  );
};

export default NotiContent;
