import React, { useState, useEffect } from 'react';
import {
  Button, Input, Modal, Tooltip, notification,
} from 'antd';
import moment from 'moment';
import { SendOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { updateComment, deleteCommentById } from '../../../services/post.service';
import updatePost from '../../../actions/updatePost';
import deleteComment from '../../../actions/deleteComment';

const EditComment = ({
  id, content, isCurrentUser, createdAt, postId, dispatch, postUpdated, eachCommentUpdated,
}) => {
  const [currentComment, editComment] = useState(content);
  const [isShowInput, showInput] = useState(false);

  useEffect(() => {
    editComment(content);
  },
  [eachCommentUpdated]);

  const showStatus = (type, m) => {
    notification[type]({
      message: m,
      placement: 'bottomRight',
    });
  };

  const postEditComment = async () => {
    const data = {
      post_id: postId,
      content: currentComment,
      comment_id: id,
    };
    const res = await updateComment(data);
    if (res.code === 1) {
      showInput(false);
      showStatus('success', res.message);
      dispatch(updatePost(!postUpdated));
    } else {
      showStatus('error', res.message);
    }
  };

  const deleteUserComment = async () => {
    const data = {
      post_id: postId,
      comment_id: id,
    };
    const res = await deleteCommentById(data);
    if (res.code === 1) {
      showStatus('success', res.message);
      dispatch(updatePost(!postUpdated));
      dispatch(deleteComment(true));
    } else {
      showStatus('error', res.message);
    }
  };

  const modalConfirm = () => {
    Modal.confirm({
      title: 'Xoá bình luận',
      icon: <ExclamationCircleOutlined />,
      content: 'Bạn xác nhận xoá bình luận này?',
      okText: 'Đồng ý',
      cancelText: 'Huỷ',
      onOk() {
        deleteUserComment();
      },
      onCancel() {
        console.log('Huỷ xoá bình luận');
      },
    });
  };

  return (
    <div className="general-layout w-75">
      <div className="general-layout w-100 flex-row justify-content-start">
        {isCurrentUser ? (
          <div className="edit-footer">
            <Button type="link" className="btn-edit" onClick={() => showInput(!isShowInput)}><span>Sửa</span></Button>
            <span className="mx-1">.</span>
            <Button type="link" className="btn-edit" onClick={modalConfirm}><span>Xoá</span></Button>
          </div>
        ) : null}
        <span className="create-comment-text text-wrap mx-3 my-1">{moment(createdAt).format('DD/MM/YYYY hh:mm A')}</span>
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
    </div>
  );
};

const mapStateToProps = (state) => ({
  postUpdated: state.updatePost,
  eachCommentUpdated: state.updateEachComment,
  commentUpdated: state.updateComment,
});

export default connect(mapStateToProps)(EditComment);
