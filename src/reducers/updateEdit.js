const updateEdit = (state = false, action) => {
  switch (action.type) {
    case 'UPDATE_EDIT':
      return action.edit;
    default:
      return state;
  }
};

export default updateEdit;
