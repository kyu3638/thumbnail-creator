import { BACKGROUND_CHANGE } from './types';

export const changeBackground = (background) => {
  return {
    type: BACKGROUND_CHANGE,
    payload: background,
  };
};
