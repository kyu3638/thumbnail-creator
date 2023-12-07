import { combineReducers } from 'redux';
import thumbnailsReducer from './stored-thumbnail/reducer';
import appBackgroundReducer from './app-background/reducer';

const rootReducer = combineReducers({
  storedThumbnails: thumbnailsReducer,
  background: appBackgroundReducer,
});

export default rootReducer;
