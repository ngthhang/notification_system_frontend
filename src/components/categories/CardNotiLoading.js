import React from 'react';
import { Card } from 'antd';

const { Meta } = Card;
const CardNotiLoading = () => (
  <Card className="w-100 card-noti-cate" loading>
    <Meta
      title="Card title"
      description="This is the description"
    />
  </Card>
);

export default CardNotiLoading;
