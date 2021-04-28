import React, { useState } from 'react';
import {
  Button, Input, Modal, Tooltip,
} from 'antd';
import { SendOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

const EditComment = ({ content }) => {
  const [currentComment, editComment] = useState(content);
  const [isShowInput, showInput] = useState(false);

  const postEditComment = () => {
    console.log(currentComment);
  };

  const modalConfirm = () => {
    Modal.confirm({
      title: 'Xoá bình luận',
      icon: <ExclamationCircleOutlined />,
      content: 'Bạn xác nhận xoá bình luận này?',
      okText: 'Đồng ý',
      cancelText: 'Huỷ',
    });
  };

  return (
    <>
      <div className="footer">
        <Button type="link" className="btn-edit" onClick={() => showInput(!isShowInput)}><span>Sửa</span></Button>
        <span className="mx-1">.</span>
        <Button type="link" className="btn-edit" onClick={modalConfirm}><span>Xoá</span></Button>
      </div>
      {
        isShowInput ? (
          <div className="footer">
            <Tooltip title="Sửa bình luận"><Input className="input-edit" defaultValue={currentComment} onChange={(e) => editComment(e.target.value)} onPressEnter={postEditComment} placeholder="Sửa bình luận" /></Tooltip>
            <Button onClick={postEditComment} icon={<SendOutlined />} shape="circle" className="btn-more" />
          </div>
        ) : (
          null
        )
      }

    </>
  );
};

export default EditComment;
