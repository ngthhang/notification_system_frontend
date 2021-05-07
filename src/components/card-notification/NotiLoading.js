import React from 'react';
import {
  Card, Skeleton, Avatar,
} from 'antd';

const { Meta } = Card;

const NotiLoading = () => (
  <Card
    className="w-100 my-2 card-loading"
  >
    <Skeleton loading avatar active>
      <Meta
        avatar={
          <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
        }
        title="Card title"
        description="This is the description"
      />
    </Skeleton>
  </Card>
);

export default NotiLoading;
