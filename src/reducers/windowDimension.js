const initState = {
  height: 0,
  width: 1440,
};

const windowDimension = (state = initState, action) => {
  if (action.type === 'SET_DIMENSION') {
    return {
      width: action.width,
      height: action.height,
    };
  }
  return state;
};

export default windowDimension;
