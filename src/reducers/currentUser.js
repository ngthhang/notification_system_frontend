const initState = {
  user: localStorage.getItem('user'),
  token: localStorage.getItem('token'),
};

const currentUser = (state = initState, action) => {
  switch (action.type) {
    case 'USER_LOGIN':
      return {
        ...state,
        user: action.user,
      };
    case 'ADD_TOKEN':
      return {
        ...state,
        token: action.token,
      };
    case 'DELETE_USER':
      return {
        user: {},
        token: '',
      };
    default:
      return state;
  }
};

export default currentUser;
