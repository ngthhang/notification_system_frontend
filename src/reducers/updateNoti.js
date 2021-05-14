const updateNoti = (state = false, action) => {
  switch (action.type) {
    case 'UPDATE_NOTI':
      return action.noti;
    default:
      return state;
  }
};

export default updateNoti;
