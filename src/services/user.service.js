import { getPosterById } from './post.service';
import { logOut } from './auth.service';
import axios from './base.service';

export const login = async (data) => {
  try {
    const res = await axios.post('/user/login', data);

    const { code } = res.data;
    if (code === 0) {
      return { code: 0, message: res.data.message };
    } if (code === 13) {
      logOut();
    }
    const { user } = res.data;
    if (user.role === 'Student') {
      return getPosterById(user._id);
    }
    return user;
  } catch (e) {
    console.log(e.message);
    return { code: 0, message: 'Lấy thông tin thất bại' };
  }
};

export const getInfo = () => {
  console.log('hello');
};

export const getUser = async (id) => {
  const token = localStorage.getItem('token');

  try {
    const res = await axios.get(`user/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`, // the token is a variable which holds the token
      },
    });

    const { code } = res.data;
    if (code === 0) {
      return { code: 0, message: res.data.message };
    } if (code === 13) {
      logOut();
    }
    const { user } = res.data;
    if (user.role === 'Student') {
      return getPosterById(user._id);
    }
    return user;
  } catch (e) {
    console.log(e.message);
    return { code: 0, message: 'Lấy thông tin thất bại' };
  }
};

export const findUser = async (userId) => {
  const token = localStorage.getItem('token');

  try {
    const res = await axios.get(`user/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`, // the token is a variable which holds the token
      },
    });

    const { code } = res.data;
    if (code === 0) {
      return { code: 0, message: res.data.message };
    } if (code === 13) {
      logOut();
    }
    const { user } = res.data;
    return user;
  } catch (e) {
    console.log(e.message);
    return { code: 0, message: 'Lấy thông tin thất bại' };
  }
};
