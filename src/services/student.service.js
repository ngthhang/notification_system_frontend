import axios from './base.service';
import { logOut } from './auth.service';

export const studentLogin = (token) => {
  console.log('token gg');
  console.log(token);
  const res = axios.post('student/google_login', token);
  return res;
};

export const findStudent = async (studentId) => {
  const token = localStorage.getItem('token');

  try {
    const res = await axios.get(`student/${studentId}`, {
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
    const { student } = res.data;
    return student;
  } catch (e) {
    console.log('Failed');
    logOut();
    return { code: 0, message: 'Lấy thông tin thất bại' };
  }
};

export const updateStudent = async (data, studentId) => {
  const token = localStorage.getItem('token');
  const bodyFormData = new FormData();
  bodyFormData.append('faculty_name', data.faculty_name);
  bodyFormData.append('class_name', data.class_name);

  if (data.avatar !== null && data.avatar !== '') {
    bodyFormData.append('attachment', data.avatar);
  }

  try {
    const res = await axios.put(`student/${studentId}`, bodyFormData, {
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
    const { student } = res.data;
    return student;
  } catch (e) {
    console.log('Failed');
    // logOut();
    return { code: 0, message: 'Lấy thông tin thất bại' };
  }
};
