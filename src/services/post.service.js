import axios from './base.service';

export const createPost = async (data) => {
  const token = localStorage.getItem('token');
  const bodyFormData = new FormData();
  bodyFormData.append('poster', data.poster);
  bodyFormData.append('image', data.images);
  bodyFormData.append('content', data.content);
  bodyFormData.append('video', data.video);

  console.log('gettt');
  console.log(data);
  console.log(bodyFormData.get('poster'));

  try {
    const res = await axios.post('/post', bodyFormData, {
      headers: {
        Authorization: `Bearer ${token}`, // the token is a variable which holds the token
        'Content-Type': 'multipart/form-data',
      },
    });

    const { code } = res.data;
    if (code === 0) {
      return { code: 0, message: res.data.message };
    }
    if (code === 13) {
      logOut();
    }
    return res.data;
  } catch (e) {
    console.log('Failed');
    // logOut();
    return { code: 0, message: 'Lấy thông tin thất bại' };
  }
};

export const getPostDetail = () => {
  console.log('helo');
};
