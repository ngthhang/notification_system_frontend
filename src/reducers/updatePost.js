const updatePost = (state = false, action) => {
  switch (action.type) {
    case 'UPDATE_POST':
      return action.post;
    default:
      return state;
  }
};

export default updatePost;
