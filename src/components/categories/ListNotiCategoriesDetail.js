import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Button } from 'antd';
import { getNotiByCategory } from '../../services/notification.service';
import { findCategoryByAliasKey } from '../../services/categories.service';
import ProfileHeader from '../general/profile/ProfileHeader';
import CardNotiCate from './CardNotiCate';
import CardNotiLoading from './CardNotiLoading';
import changeRedirect from '../../actions/redirectFaculty';
import AdvanceHeader from '../general/AdvanceHeader';
import Footer from '../general/Footer';

const ListNotiCategoriesDetail = ({ notiUpdated, aliasKey, dispatch }) => {
  const [loading, setLoading] = useState(true);
  const [cate, setCate] = useState({});
  const [hasMore, setHasMore] = useState(true);
  const [redirect, setRedirect] = useState(false);
  // const [currentPage, setPage] = useState(1);
  const [notiList, setList] = useState([]);

  useEffect(async () => {
    dispatch(changeRedirect('categories-detail'));
    const resCate = await findCategoryByAliasKey(aliasKey);
    const res = await getNotiByCategory(resCate._id, 1);
    if (res.length > 0) {
      setList(res);
    } else {
      setHasMore(false);
    }
    setCate(resCate);
    setLoading(false);
  }, [notiUpdated]);

  const routeHome = () => {
    setRedirect(true);
  };

  if (redirect) {
    return <Redirect to="/" />;
  }

  if (!hasMore) {
    return (

      <div className="general-layout h-100">
        <AdvanceHeader />
        <div className="general-layout justify-content-start w-100 h-100">
          <ProfileHeader name={cate.name} position="Phòng / Khoa" avatar="" />
          <span className="my-4">Không có thông báo hiển thị</span>
          <Button onClick={routeHome} type="primary" size="large">Quay về trang chủ</Button>
        </div>
        <Footer />
      </div>
    );
  }
  return (
    <div className="general-layout">
      <AdvanceHeader />
      <div className="general-layout justify-content-start w-100 h-100">
        <ProfileHeader name={cate.name} position="Phòng / Khoa" avatar="" />
        {loading ? (
          <div className="w-90 my-4">
            <CardNotiLoading />
            <CardNotiLoading />
          </div>
        ) : null}
        {!loading && hasMore ? (
          <>
            <div className="w-90 general-layout my-4">
              {notiList && notiList.length > 0 && notiList.map((item) => (
                <CardNotiCate item={item} key={item._id} />
              ))}
            </div>
            <Button onClick={routeHome} type="primary" size="large">Quay về trang chủ</Button>

          </>
        ) : null}
      </div>
      <Footer />
    </div>

  );
};

const mapStateToProps = (state) => ({
  redirectFaculty: state.redirectFaculty,
  notiUpdated: state.updateNoti,
});

export default connect(mapStateToProps)(ListNotiCategoriesDetail);
