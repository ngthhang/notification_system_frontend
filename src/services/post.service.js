import axios from './base.service';

export const createPost = async (data) => {
  const token = localStorage.getItem('token');

  const bodyFormData = new FormData();
  if (data.video !== undefined && data.video !== null) {
    bodyFormData.append('video', data.video);
  }
  bodyFormData.append('poster', data.poster);
  data.images.map((item) => bodyFormData.append('attachment', item));
  bodyFormData.append('content', data.content);

  console.log(bodyFormData.get('attachment'));
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

export const getPostByPoster = async (id, page) => {
  const token = localStorage.getItem('token');
  const data = { user_id: id };
  try {
    const res = await axios.post(`/post/new/${page}`, data, {
      headers: {
        Authorization: `Bearer ${token}`, // the token is a variable which holds the token
      },
    });

    const { code } = res.data;
    if (code === 13) {
      logOut();
    }
    return res.data.posts;
  } catch (e) {
    console.log(e.message);
    // logOut();
    return { code: 0, message: 'Lấy thông tin thất bại' };
  }
};

export const getAllPostByPage = async (page) => {
  const token = localStorage.getItem('token');
  try {
    const res = await axios.post(`/post/new/${page}`, {}, {
      headers: {
        Authorization: `Bearer ${token}`, // the token is a variable which holds the token
      },
    });

    const { code } = res.data;
    if (code === 13) {
      logOut();
    }
    return res.data.posts;
  } catch (e) {
    console.log(e.message);
    // logOut();
    return { code: 0, message: 'Lấy thông tin thất bại' };
  }
};

export const getPosterById = async (id) => {
  const token = localStorage.getItem('token');
  try {
    const res = await axios.get(`/student/user_id/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`, // the token is a variable which holds the token
      },
    });

    const { code } = res.data;
    if (code === 13) {
      logOut();
    }
    return res.data.student;
  } catch (e) {
    console.log(e.message);
    // logOut();
    return { code: 0, message: 'Lấy thông tin thất bại' };
  }
};

export const getCommentsByPostId = async (postId) => {
  const token = localStorage.getItem('token');
  try {
    const res = await axios.get(`/post/${postId}`, {
      headers: {
        Authorization: `Bearer ${token}`, // the token is a variable which holds the token
      },
    });

    const { code } = res.data;
    if (code === 13) {
      logOut();
    }
    return res.data.posts.comments;
  } catch (e) {
    console.log(e.message);
    // logOut();
    return { code: 0, message: 'Lấy thông tin thất bại' };
  }
};

export const deletePostById = async (postId) => {
  const token = localStorage.getItem('token');
  console.log(`token: ${token}`);
  const data = {
    post_id: postId,
  };
  try {
    const res = await axios.post('/post/delete', data, {
      headers: {
        Authorization: `Bearer ${token}`, // the token is a variable which holds the token
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
    return { code: 0, message: 'Xoá thông tin thất bại' };
  }
};

export const updatePostById = async (data) => {
  const token = localStorage.getItem('token');
  const bodyFormData = new FormData();
  data.attachment.map((item) => bodyFormData.append('attachment', item));
  bodyFormData.append('content', data.content);
  bodyFormData.append('video', data.video);
  bodyFormData.append('post_id', data.post_id);
  console.log(bodyFormData.get('attachment'));
  try {
    const res = await axios.put('/post', bodyFormData, {
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

export const createComment = async (data) => {
  const token = localStorage.getItem('token');
  console.log('data', data);
  try {
    const res = await axios.post('/post/comment', data, {
      headers: {
        Authorization: `Bearer ${token}`, // the token is a variable which holds the token
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
    console.log(e.message);
    // logOut();
    return { code: 0, message: 'Lấy thông tin thất bại' };
  }
};

export const deleteCommentById = async (data) => {
  const token = localStorage.getItem('token');
  console.log('data', data);
  try {
    const res = await axios.post('/post/delete_comment', data, {
      headers: {
        Authorization: `Bearer ${token}`, // the token is a variable which holds the token
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
    console.log(e.message);
    // logOut();
    return { code: 0, message: 'Lấy thông tin thất bại' };
  }
};

export const updateComment = async (data) => {
  const token = localStorage.getItem('token');
  console.log('data', data);
  try {
    const res = await axios.put('/post/comment', data, {
      headers: {
        Authorization: `Bearer ${token}`, // the token is a variable which holds the token
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
    console.log(e.message);
    // logOut();
    return { code: 0, message: 'Lấy thông tin thất bại' };
  }
};
