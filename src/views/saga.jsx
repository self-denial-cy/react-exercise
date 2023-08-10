import { connect } from 'react-redux';
import * as TYPES from '../store/action-types';

export const SagaView = connect((state) => state.saga)(function (props) {
  const { count, dispatch } = props;
  return (
    <>
      <div>redux-saga 应用</div>
      <button
        onClick={() => {
          dispatch({
            type: `SAGA_${TYPES.SAGA_COUNT_CHANGE}`,
            payload: count + 1
          });
        }}
      >
        {count}
      </button>
    </>
  );
});
