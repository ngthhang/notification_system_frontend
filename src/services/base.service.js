import axios from 'axios';
// http://webnc.ap-1.evennode.com/
export default axios.create({
  baseURL: 'https://witty-ruby-lace.glitch.me/',
  headers: {
    'Content-type': 'application/json',
  },
});
