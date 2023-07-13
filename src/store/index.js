import { createStore } from 'redux';

// 初始状态
const initial = {
  title: 'redux 初体验'
};

// 管理员，用于管理 store 容器【state 容器中的公共状态【initial 为其初始值】，action 每一次基于 dispatch 派发传递进来的行为对象【必须有 type 属性，存储派发的行为标识】】
function reducer(state = initial, action) {
  // 为了不直接修改容器中公共状态信息，而是等到最后 return 的时候整体替换，下面先简单浅克隆一下【后续优化成深克隆】
  state = { ...state };
  // 基于派发的行为标识，修改 store 容器中的状态信息
  switch (action.type) {
    case 'titleChange':
      state.title = state.title + ' !';
      break;
    default:
      break;
  }
  return state; // return 的内容，会整体替换 store 容器中的内容
}

// store 容器
const store = createStore(reducer);

/**
 * store 每一次 dispatch 都会将 reducer 执行一遍，store 初始化时会在 redux 内部执行一遍 reducer，只不过 action.type 是一堆火星文
 * 不会匹配到任何修改行为
 */

export default store;
