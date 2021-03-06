import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getAllNoti } from '../../services/notification.service';
import CardNotiCate from '../categories/CardNotiCate';
import AdvanceHeader from '../general/AdvanceHeader';
import Footer from '../general/Footer';
import changeRedirect from '../../actions/redirectFaculty';
import updateEdit from '../../actions/updateEdit';

let currentPage = 1;
let postHere = [];

const ListNoti = ({
  notiUpdated, dispatch, editUpdated,
}) => {
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [notiList, setList] = useState([]);
  const nodeRoot = document.getElementById('root');

  const getData = async () => {
    const res = await getAllNoti(currentPage);
    if (res.length > 0 && currentPage !== 1) {
      console.log(currentPage);
      console.log(res);
      setList(postHere.concat(res));
      postHere = postHere.concat(res);
      dispatch(updateEdit(!editUpdated));
    } else if (currentPage === 1) {
      setList(res);
      postHere = res;
    } else {
      setHasMore(false);
    }
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
    dispatch(changeRedirect('noti-all'));
    currentPage = 1;
    nodeRoot.addEventListener('scroll', handleScroll);
    return () => nodeRoot.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(async () => {
    currentPage = 1;
    getData();
  }, [notiUpdated]);

  return (
    <div className="general-layout">
      <AdvanceHeader />
      <div className="general-layout justify-content-start w-75 h-100">
        <span className="list-header">Tất cả thông báo</span>
        {!loading ? (
          <>
            <div className="w-90 general-layout my-4">
              {notiList && notiList.length > 0 && notiList.map((item) => (
                <CardNotiCate item={item} key={item._id} />
              ))}
            </div>
          </>
        ) : null}
        {!hasMore ? (
          <div className="w-100 general-layout h-100">
            <span className="my-4">Không còn thông báo hiển thị</span>
          </div>
        ) : null}
      </div>
      <Footer />
    </div>

  );
};

const mapStateToProps = (state) => ({
  redirectFaculty: state.redirectFaculty,
  notiUpdated: state.updateNoti,
  editUpdated: state.updateEdit,
});

export default connect(mapStateToProps)(ListNoti);
