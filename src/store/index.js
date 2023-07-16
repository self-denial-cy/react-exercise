import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import reducer from './reducer';
import reduxLogger from 'redux-logger';
import reduxThunk from 'redux-thunk';

// store 容器
const store = createStore(reducer, applyMiddleware(reduxLogger, reduxThunk));

/**
 * store 每一次 dispatch 都会将 reducer 执行一遍，store 初始化时会在 redux 内部执行一遍 reducer，只不过 action.type 是
 * 一堆火星文，不会匹配到任何修改行为
 */

export default store;
