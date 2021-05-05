import axios from 'axios';

export default axios.create({
  baseURL: 'https://webnc-final-backend.herokuapp.com/',
  headers: {
    'Content-type': 'application/json',
  },
});
