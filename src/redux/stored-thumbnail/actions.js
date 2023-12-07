import {
  ADD_THUMBNAIL,
  REMOVE_ONE_THUMBNAIL,
  REMOVE_ALL_THUMBNAIL,
} from './types';

/** storedThumbnails에 newThumbInfo를 추가해, local storage에 set한다. */
export const addThumbnail = (newThumbInfo) => {
  return {
    type: ADD_THUMBNAIL,
    payload: newThumbInfo,
  };
};

/** 임시저장된 썸네일 중 하나를 삭제하도록 action, 해담 썸네일의 id를 인자로 받아 storedThumbnails에서 filter를 통해 삭제해준다 */
export const removeOneThumbnail = (targetId) => {
  return {
    type: REMOVE_ONE_THUMBNAIL,
    payload: targetId,
  };
};

/** 임시저장된 썸네일 모두를 삭제하도록 action, Local storage에서 'thumbnail' key를 삭제한다. */
export const removeAllThumbnails = () => {
  return {
    type: REMOVE_ALL_THUMBNAIL,
  };
};
