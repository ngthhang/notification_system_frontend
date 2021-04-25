import { combineReducers } from 'redux';
import count from './count';
import redirectLogin from './redirectLogin';
import logoImg from './logoImg';
import windowDimension from './windowDimension';
import redirectFaculty from './redirectFaculty';

export default combineReducers({
  count, redirectLogin, logoImg, windowDimension, redirectFaculty,
});
