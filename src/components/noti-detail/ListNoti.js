import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getAllNoti } from '../../services/notification.service';
import CardNotiCate from '../categories/CardNotiCate';
import CardNotiLoading from '../categories/CardNotiLoading';
import AdvanceHeader from '../general/AdvanceHeader';
import Footer from '../general/Footer';
import changeRedirect from '../../actions/redirectFaculty';
import updateEdit from '../../actions/updateEdit';

const ListNoti = ({
  notiUpdated, dispatch, editUpdated,
}) => {
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [notiList, setList] = useState([]);
  // const [currentPage, setPage] = useState(1);
  // const nodeRoot = document.getElementById('root');
  // const [referenceNode, setReferenceNode] = useState();

  // const handleScroll = (event) => {
  //   const node = event.target;
  //   const bottom = node.scrollHeight - node.clientHeight === Math.ceil(node.scrollTop);
  //   if (bottom) {
  //     console.log('BOTTOM REACHED');
  //     setPage(currentPage + 1);
  //   }
  // };

  // const paneDidMount = (node) => {
  //   if (node) {
  //     node.addEventListener('scroll', handleScroll);
  //     setReferenceNode(node);
  //   }
  // };

  useEffect(async () => {
    dispatch(changeRedirect('noti-all'));
    const res = await getAllNoti(1);
    if (res.length > 0) {
      setList(res);
      // setList(notiList.concat(res));
    } else {
      setHasMore(false);
    }
    console.log('list noti');
    console.log(res);
    setLoading(false);
    dispatch(updateEdit(!editUpdated));
    // paneDidMount(nodeRoot);
    // return () => referenceNode.removeEventListener('scroll', handleScroll);
  }, [notiUpdated]);

  return (
    <div className="general-layout">
      <AdvanceHeader />
      <div className="general-layout justify-content-start w-75 h-100">
        <span className="list-header">Tất cả thông báo</span>
        {loading ? (
          <div className="w-90 my-4">
            <CardNotiLoading />
            <CardNotiLoading />
            <CardNotiLoading />
          </div>
        ) : null}
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
