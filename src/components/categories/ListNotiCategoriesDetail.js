import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getNotiByCategory } from '../../services/notification.service';
import { findCategoryByAliasKey } from '../../services/categories.service';
import ProfileHeader from '../general/profile/ProfileHeader';
import CardNotiCate from './CardNotiCate';
import AdvanceHeader from '../general/AdvanceHeader';
import Footer from '../general/Footer';

let postHere = [];
let currentPage = 1;

const ListNotiCategoriesDetail = ({
  notiUpdated, aliasKey,
}) => {
  const [loading, setLoading] = useState(true);
  const [cate, setCate] = useState({});
  const [hasMore, setHasMore] = useState(true);
  const nodeRoot = document.getElementById('root');
  const [notiList, setList] = useState([]);

  const getData = async () => {
    const resCate = await findCategoryByAliasKey(aliasKey);
    const res = await getNotiByCategory(resCate._id, currentPage);
    if (res.length > 0 && currentPage !== 1) {
      setList(postHere.concat(res));
      postHere = postHere.concat(res);
    } else if (currentPage === 1) {
      setList(res);
      postHere = res;
    } else {
      setHasMore(false);
    }
    setCate(resCate);
    setLoading(false);
  };

  const handleScroll = (event) => {
    const node = event.target;
    const bottom = node.scrollHeight - node.clientHeight === Math.ceil(node.scrollTop);
    if (bottom) {
      currentPage += 1;
      console.log('BOTTOM REACHED');
      getData();
    }
  };

  useEffect(() => {
    getData();
    currentPage = 1;
  }, [notiUpdated]);

  useEffect(() => {
    currentPage = 1;
    nodeRoot.addEventListener('scroll', handleScroll);
    return () => nodeRoot.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="general-layout">
      <AdvanceHeader />
      <div className="general-layout justify-content-start w-100 h-100">
        <ProfileHeader name={cate.name} position="Phòng / Khoa" avatar="" />
        {!loading ? (
          <>
            <div className="w-90 general-layout my-4">
              {notiList && notiList.length > 0 && notiList.map((item) => (
                <CardNotiCate item={item} key={item._id} />
              ))}
            </div>
            {!hasMore ? <span className="d-flex align-items-center justify-content-center my-2 w-100">Không còn thông báo hiển thị</span> : null}
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
