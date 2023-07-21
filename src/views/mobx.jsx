import { makeObservable, observable, computed, action } from 'mobx';
import { observer } from 'mobx-react';
import React from 'react';
import { delay } from '../utils';

class Store {
  constructor() {
    makeObservable(this);
  }

  @observable
  count = 0;

  @computed
  get doubleCount() {
    return this.count * 2;
  }

  @action
  async addCount() {
    await delay(2000);
    this.count++;
  }
}

const store = new Store();

@observer
export class MobxClassView extends React.Component {
  render() {
    return (
      <>
        <button
          onClick={() => {
            store.addCount();
          }}
        >
          {store.count} | {store.doubleCount}
        </button>
      </>
    );
  }
}

export const MobxFunctionalView = observer(function () {
  return (
    <>
      <button
        onClick={() => {
          store.addCount();
        }}
      >
        {store.count} | {store.doubleCount}
      </button>
    </>
  );
});
