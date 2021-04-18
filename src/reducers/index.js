import { combineReducers } from 'redux';
import count from './count';
import redirectLogin from './redirectLogin';
import logoImg from './logoImg';
import windowDimension from './windowDimension';

export default combineReducers({
  count, redirectLogin, logoImg, windowDimension,
});
