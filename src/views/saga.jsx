import { connect } from 'react-redux';

export const SagaView = connect((state) => state.saga)(function (props) {
  const { count } = props;
  return (
    <>
      <div>redux-saga 应用</div>
      <button>{count}</button>
    </>
  );
});
