import { combineReducers } from 'redux'; // 合并 reducer
import { appReducer } from './modules';

// reducer 模块化
const reducer = combineReducers({
  app: appReducer
});

export default reducer;
