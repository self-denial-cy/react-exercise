import _ from 'lodash';
import * as TYPES from '../../action-types';

const initial = {
  count: 0
};

export function sagaReducer(state = initial, action) {
  state = _.cloneDeep(state);
  switch (action.type) {
    case TYPES.SAGA_COUNT_CHANGE:
      state.count = action.count;
      break;
    default:
      break;
  }
  return state;
}
