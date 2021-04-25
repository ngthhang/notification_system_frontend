const redirectFaculty = (state = 'newsfeed', action) => {
  switch (action.type) {
    case 'CHANGE_REDIRECT':
      return action.redirectPage;
    default:
      return state;
  }
};

export default redirectFaculty;
