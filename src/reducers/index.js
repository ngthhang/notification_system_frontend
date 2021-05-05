import { combineReducers } from 'redux';
import count from './count';
import redirectLogin from './redirectLogin';
import logoImg from './logoImg';
import windowDimension from './windowDimension';
import redirectFaculty from './redirectFaculty';
import currentUser from './currentUser';
import isAuth from './isAuth';

export default combineReducers({
  count, redirectLogin, logoImg, windowDimension, redirectFaculty, currentUser, isAuth,
});
