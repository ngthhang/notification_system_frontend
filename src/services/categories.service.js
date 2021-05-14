import axios from './base.service';

export const getAllCategories = async () => {
  const token = localStorage.getItem('token');
  try {
    const res = await axios.get('/categories', {
      headers: {
        Authorization: `Bearer ${token}`, // the token is a variable which holds the token
      },
    });

    const { code } = res.data;
    if (code === 13) {
      logOut();
    }
    return res.data.data;
  } catch (e) {
    console.log(e.message);
    return { code: 0, message: 'Lấy thông tin thất bại' };
  }
};

export const findCategoryByAliasKey = async (key) => {
  const token = localStorage.getItem('token');
  try {
    const res = await axios.get(`/categories/${key}`, {
      headers: {
        Authorization: `Bearer ${token}`, // the token is a variable which holds the token
      },
    });

    const { code } = res.data;
    if (code === 13) {
      logOut();
    }
    return res.data.data;
  } catch (e) {
    console.log(e.message);
    return { code: 0, message: 'Lấy thông tin thất bại' };
  }
};
