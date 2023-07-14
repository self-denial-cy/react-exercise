import _ from 'lodash';
import * as TYPES from '../../action-types';

// 初始状态信息
const initial = {
  title: 'redux 初体验',
  count: 0
};

/**
 * 管理员，用于管理 store 容器【state 容器中的公共状态【initial 为其初始值】，action 每一次基于 dispatch 派发传递进来的
 * 行为对象【必须有 type 属性，存储派发的行为标识】对 state 进行变更】
 */
export function appReducer(state = initial, action) {
  // 为了不直接修改容器中公共状态信息，而是等到最后 return 的时候整体替换，下面先克隆一份 state 使用
  state = _.cloneDeep(state);
  // 基于派发的行为标识，修改 state
  switch (action.type) {
    case TYPES.APP_TITLE_CHANGE:
      state.title = state.title + ' !';
      break;
    case TYPES.APP_COUNT_CHANGE:
      state.count++;
      break;
    default:
      break;
  }
  return state; // return 的内容，会整体替换 store 容器中的状态信息
}
