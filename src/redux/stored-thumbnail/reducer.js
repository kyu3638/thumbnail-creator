import {
  ADD_THUMBNAIL,
  REMOVE_ONE_THUMBNAIL,
  REMOVE_ALL_THUMBNAIL,
} from './types';
import storage from '../../utils/storage/storage';

const initialState = storage.get('thumbnail') || [];

const thumbnailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_THUMBNAIL:
      const addedArray = [].concat(action.payload, ...state);
      storage.set('thumbnail', addedArray);
      return addedArray;
    case REMOVE_ONE_THUMBNAIL:
      const updatedArray = state.filter((thumb) => {
        return thumb.id !== action.payload;
      });
      storage.set('thumbnail', updatedArray);
      return updatedArray;
    case REMOVE_ALL_THUMBNAIL:
      state = [];
      storage.remove('thumbnail');
      return state;
    default:
      return state;
  }
};

export default thumbnailsReducer;
