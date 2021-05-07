import axios from 'axios';

export default axios.create({
  baseURL: 'https://witty-ruby-lace.glitch.me/',
  headers: {
    'Content-type': 'application/json',
  },
});
