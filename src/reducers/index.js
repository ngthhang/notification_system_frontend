import { combineReducers } from 'redux';
import count from './count';
import redirectLogin from './redirectLogin';

export default combineReducers({
  count, redirectLogin,
});
