import { legacy_createStore as createStore } from 'redux';
import thumbnailsReducer from './stored-thumbnail/reducer';

const store = createStore(thumbnailsReducer);

export default store;
