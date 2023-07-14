import { legacy_createStore as createStore } from 'redux';
import reducer from './reducer';

// store 容器
const store = createStore(reducer);

/**
 * store 每一次 dispatch 都会将 reducer 执行一遍，store 初始化时会在 redux 内部执行一遍 reducer，只不过 action.type 是
 * 一堆火星文，不会匹配到任何修改行为
 */

export default store;
