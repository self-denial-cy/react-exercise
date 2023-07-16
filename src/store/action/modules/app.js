import * as TYPES from '../../action-types';
import { delay } from '../../../utils';

export const appAction = {
  titleChange() {
    return {
      type: TYPES.APP_TITLE_CHANGE
    };
  },
  countChange() {
    // 适配 redux-thunk 的语法，支持异步 action【或者使用 redux-promise 也可以实现异步 action】
    return async (dispatch) => {
      await delay(2000);
      dispatch({
        type: TYPES.APP_COUNT_CHANGE
      });
    };
  }
};
