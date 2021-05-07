const updateList = (state = false, action) => {
  switch (action.type) {
    case 'UPDATE_LIST':
      return action.list;
    default:
      return state;
  }
};

export default updateList;
