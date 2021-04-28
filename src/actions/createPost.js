export const changeCategory = (value) => ({
  type: 'CHANGE_CATEGORY',
  category: value,
});

export const changeHeader = (value) => ({
  type: 'CHANGE_HEADER',
  header: value,
});

export const changeContent = (value) => ({
  type: 'CHANGE_CONTENT',
  content: value,
});

export const changeVideoURL = (value) => ({
  type: 'CHANGE_VIDEO',
  video: value,
});

export const addImage = (value) => ({
  type: 'ADD_IMAGE',
  image: value,
});
