import { combineReducers } from 'redux'; // 合并 reducer
import { appReducer, sagaReducer } from './modules';

// reducer 模块化
const reducer = combineReducers({
  app: appReducer,
  saga: sagaReducer
});

export default reducer;
