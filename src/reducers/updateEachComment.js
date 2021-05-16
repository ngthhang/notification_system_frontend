const updateEachComment = (state = false, action) => {
  switch (action.type) {
    case 'UPDATE_EACH_COMMENT':
      return action.info;
    default:
      return state;
  }
};

export default updateEachComment;
