import { BACKGROUND_CHANGE } from './types';

const initialState = `url(https://images.unsplash.com/photo-1685895324391-ba9e104fd2d0?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`;

const appBackgroundReducer = (state = initialState, action) => {
  switch (action.type) {
    case BACKGROUND_CHANGE:
      return action.payload;
    default:
      return state;
  }
};

export default appBackgroundReducer;
