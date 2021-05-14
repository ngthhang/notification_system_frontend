import axios from './base.service';

export const logOut = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('role');
  localStorage.removeItem('user');
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
      return false;
    }
    return true;
  } catch (e) {
    console.log(e.message);
    logOut();
    return false;
  }
};

export const auth = () => {
  const user = localStorage.getItem('user');
  let res = false;
  if (user !== null) {
    res = findUser(user);
  }
  if (res) {
    return true;
  }
  return false;
};
