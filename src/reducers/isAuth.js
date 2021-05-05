const isAuth = (state = false, action) => {
  switch (action.type) {
    case 'AUTHENICATED':
      return true;
    default:
      return state;
  }
};

export default isAuth;
