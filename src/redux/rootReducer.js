import { combineReducers } from 'redux';
import thumbnailsReducer from './stored-thumbnail/reducer';

const rootReducer = combineReducers({
  storedThumbnails: thumbnailsReducer,
});

export default rootReducer;
