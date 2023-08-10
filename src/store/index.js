import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import reducer from './reducer';
import reduxLogger from 'redux-logger';
import reduxThunk from 'redux-thunk';
import { configureStore } from '@reduxjs/toolkit';
import { appReducer } from './feature';

// store 容器
const store = createStore(reducer, applyMiddleware(reduxLogger, reduxThunk));

/**
 * store 每一次 dispatch 都会将 reducer 执行一遍，store 初始化时会在 redux 内部执行一遍 reducer，只不过 action.type 是
 * 一堆火星文，不会匹配到任何修改行为
 */

export default store;

export const sagaStore = createStore(reducer, applyMiddleware(reduxLogger));

export const latestStore = configureStore({
  // 传入 reducer 和设置中间件
  reducer: {
    // 按模块管理各个切片
    app: appReducer
  },
  // 不设置 middleware 则默认集成了 redux-thunk 中间件，一旦设置就得设置全【因为是全量覆盖默认配置】
  middleware: [reduxLogger, reduxThunk]
});
