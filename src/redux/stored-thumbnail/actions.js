import {
  ADD_THUMBNAIL,
  REMOVE_ONE_THUMBNAIL,
  REMOVE_ALL_THUMBNAIL,
} from './types';

export const addThumbnail = (newThumbInfo) => {
  // console.log(newThumbInfo);
  return {
    type: ADD_THUMBNAIL,
    payload: newThumbInfo,
  };
};

export const removeOneThumbnail = (targetId) => {
  return {
    type: REMOVE_ONE_THUMBNAIL,
    payload: targetId,
  };
};

export const removeAllThumbnails = () => {
  return {
    type: REMOVE_ALL_THUMBNAIL,
  };
};
