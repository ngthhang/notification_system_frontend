import { combineReducers } from 'redux';
import count from './count';
import redirectLogin from './redirectLogin';
import logoImg from './logoImg';
import windowDimension from './windowDimension';
import redirectFaculty from './redirectFaculty';
import currentUser from './currentUser';
import isAuth from './isAuth';
import updatePost from './updatePost';
import updateComment from './updateComment';
import updateList from './updateList';

export default combineReducers({
  count,
  redirectLogin,
  logoImg,
  windowDimension,
  redirectFaculty,
  currentUser,
  isAuth,
  updatePost,
  updateComment,
  updateList,
});
