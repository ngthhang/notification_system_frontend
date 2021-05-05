export const auth = () => {
  const token = localStorage.getItem('token');
  if (token) {
    return true;
  }
  return false;
};

export const logOut = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('role');
  localStorage.removeItem('user');
  console.log('log out');
};
