import { createSlice } from '@reduxjs/toolkit';
import { delay } from '../../utils';

// 每个模块的切片中包含了 reducer、actions
const appSlice = createSlice({
  name: 'app',
  initialState: {
    title: 'redux toolkit 初体验',
    count: 0
  },
  reducers: {
    titleChange(state, action) {
      state.title = state.title + ' !';
    },
    countChange(state, action) {
      state.count++;
    }
  }
});

export const appReducer = appSlice.reducer;

export const { titleChange } = appSlice.actions; // 这里返回的方法是 actionCreator

export function countChange() {
  return async (dispatch) => {
    await delay(2000);
    dispatch(appSlice.actions.countChange());
  };
}
