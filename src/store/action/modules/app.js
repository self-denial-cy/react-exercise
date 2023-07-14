import * as TYPES from '../../action-types';

export const appAction = {
  titleChange() {
    return {
      type: TYPES.APP_TITLE_CHANGE
    };
  },
  countChange() {
    return {
      type: TYPES.APP_COUNT_CHANGE
    };
  }
};
