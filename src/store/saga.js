import { takeEvery, delay, put } from 'redux-saga/effects';
import * as TYPES from './action-types';

export default function* saga() {
  // 注意这里监听的 type 不能与 action、reducer 中的 type 相同，否则会导致触发两次 action、reducer 的问题
  yield takeEvery(`SAGA_${TYPES.SAGA_COUNT_CHANGE}`, countChange);
}

function* countChange(action) {
  yield delay(2000);
  // 这里的 put 就类似 dispatch，直接在 reducer 中通过 switch/case 匹配处理即可
  yield put({ type: TYPES.SAGA_COUNT_CHANGE, payload: action.payload });
}
