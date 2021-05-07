const updateComment = (state = false, action) => {
  switch (action.type) {
    case 'UPDATE_COMMENT':
      return action.comment;
    default:
      return state;
  }
};

export default updateComment;
