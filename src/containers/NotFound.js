import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Result, Button } from 'antd';
import { connect } from 'react-redux';
import changeRedirect from '../actions/redirectFaculty';
import { auth } from '../services/auth.service';

const NotFound = ({ dispatch }) => {
  dispatch(changeRedirect('404-page'));
  const [redirect, enableRedirect] = useState(false);
  if (!auth()) {
    return <Redirect to="/login" />;
  }

  if (redirect) {
    return <Redirect to="/" />;
  }
  return (
    <div className="w-100 h-100">
      <Result
        status="404"
        title="404"
        className="h-100"
        subTitle="Sorry, the page you visited does not exist."
        extra={<Button type="primary" onClick={() => enableRedirect(true)}>Trở về trang chủ</Button>}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.currentUser,
});

export default connect(mapStateToProps)(NotFound);
