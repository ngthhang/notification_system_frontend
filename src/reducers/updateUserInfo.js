const updateUserInfo = (state = false, action) => {
  switch (action.type) {
    case 'UPDATE_INFO':
      return action.info;
    default:
      return state;
  }
};

export default updateUserInfo;
