import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { Button } from 'antd';
import { connect } from 'react-redux';
import AdvanceHeader from '../general/AdvanceHeader';
import Footer from '../general/Footer';
import { getNotiById } from '../../services/notification.service';
import CardNotiCate from '../categories/CardNotiCate';
import CardNotiLoading from '../categories/CardNotiLoading';
import changeRedirect from '../../actions/redirectFaculty';

const CardNoti = ({ id, dispatch, notiUpdated }) => {
  const [loading, setLoading] = useState(true);
  const [item, setItem] = useState({});
  const [redirect, setRedirect] = useState(false);
  const nodeRoot = document.getElementById('root');
  const [referenceNode, setReferenceNode] = useState();

  const handleScroll = (event) => {
    const node = event.target;
    const bottom = node.scrollHeight - node.clientHeight === Math.ceil(node.scrollTop);
    if (bottom) {
      console.log('BOTTOM NEAR:', bottom);
    }
  };

  const paneDidMount = (node) => {
    if (node) {
      node.addEventListener('scroll', handleScroll);
      setReferenceNode(node);
    }
  };

  useEffect(async () => {
    dispatch(changeRedirect('noti-detail'));
    const res = await getNotiById(id);
    setItem(res.noti);
    setLoading(false);
    paneDidMount(nodeRoot);
    return () => referenceNode.removeEventListener('scroll', handleScroll);
  }, [notiUpdated]);

  if (loading) {
    return (
      <div className="general-layout">
        <AdvanceHeader />
        <div className="h-100 w-75 general-layout justify-content-start my-4">
          <CardNotiLoading />
        </div>
        <Footer />
      </div>
    );
  }

  if (redirect) {
    return <Redirect to="/" />;
  }

  return (
    <div className="general-layout justify-content-start">
      <AdvanceHeader />
      <div className="general-layout justify-content-start my-4 w-75 h-100">
        <CardNotiCate item={item} />
        <Button className="my-2" size="large" onClick={() => setRedirect(true)}>Quay về trang chủ</Button>
      </div>
      <Footer />
    </div>
  );
};

const mapStateToProps = (state) => ({
  notiUpdated: state.updateNoti,
});

export default connect(mapStateToProps)(CardNoti);
