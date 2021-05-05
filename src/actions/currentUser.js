export const saveToken = (token) => ({
  type: 'ADD_TOKEN',
  token,
});

export const saveUser = (user) => ({
  type: 'USER_LOGIN',
  user,
});

export const deleteUser = () => ({
  type: 'DELETE_USER',
});
