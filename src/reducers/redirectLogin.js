const redirectLogin = (state = false, action) => {
  switch (action.type) {
    case 'DISABLE':
      return false;
    case 'ENABLE':
      return true;
    default:
      return state;
  }
};

export default redirectLogin;
