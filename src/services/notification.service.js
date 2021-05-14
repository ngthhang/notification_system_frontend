import axios from './base.service';

export const getAllNoti = async (page) => {
  const token = localStorage.getItem('token');
  try {
    const res = await axios.get(`/notify/new/${page}`, {
      headers: {
        Authorization: `Bearer ${token}`, // the token is a variable which holds the token
      },
    });

    const { code } = res.data;
    if (code === 13) {
      logOut();
    }
    return res.data.notify;
  } catch (e) {
    console.log(e.message);
    // logOut();
    return { code: 0, message: 'Lấy thông tin thất bại' };
  }
};

export const deleteNoti = async (data) => {
  const token = localStorage.getItem('token');

  try {
    const res = await axios.post('/notify/delete', data, {
      headers: {
        Authorization: `Bearer ${token}`, // the token is a variable which holds the token
      },
    });

    const { code } = res.data;
    if (code === 13) {
      logOut();
    }
    return res.data;
  } catch (e) {
    console.log(e.message);
    // logOut();
    return { code: 0, message: 'Lấy thông tin thất bại' };
  }
};

export const updateNoti = async (data) => {
  const token = localStorage.getItem('token');
  const bodyFormData = new FormData();
  bodyFormData.append('noti_id', data.notify_id);
  bodyFormData.append('header', data.header);
  bodyFormData.append('content', data.content);
  if (data.attachment !== undefined) {
    data.attachment.map((item) => bodyFormData.append('attachment', item));
  }

  try {
    const res = await axios.put('/notify', bodyFormData, {
      headers: {
        Authorization: `Bearer ${token}`, // the token is a variable which holds the token
      },
    });

    const { code } = res.data;
    if (code === 13) {
      logOut();
    }
    return res.data;
  } catch (e) {
    console.log(e.message);
    // logOut();
    return { code: 0, message: 'Lấy thông tin thất bại' };
  }
};

export const getNotiByCategory = async (cateId, page) => {
  const token = localStorage.getItem('token');
  try {
    const res = await axios.get(`/notify/${cateId}/${page}`, {
      headers: {
        Authorization: `Bearer ${token}`, // the token is a variable which holds the token
      },
    });

    const { code } = res.data;
    if (code === 13) {
      logOut();
    }
    return res.data.notify;
  } catch (e) {
    console.log(e.message);
    // logOut();
    return { code: 0, message: 'Lấy thông tin thất bại' };
  }
};
