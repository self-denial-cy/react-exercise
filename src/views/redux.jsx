/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState, useEffect } from 'react';
import store from '../store';
import StoreContext from '../context/StoreContext';

/**
 * 1. 创建全局公共的容器，用来存储各组件需要的公共信息
 *    在创建的 store 容器中，存储两部分内容，公共状态【各组件需要共享/通信的信息】、事件池【存放让组件可以更新的方法】
 *    当公共状态一旦发生变更，会默认立即通知事件池中的方法执行，这些方法主要目的是让指定的组件更新，组件一更新，就会去获取最新的公共状态进行渲染
 * 2. 在组件内部，通过 store.getState() 获取公共状态信息
 * 3. 把【让组件可以更新的】方法放入公共容器的事件池中 store.subscribe
 *    后期公共状态变更，事件池中的方法会按照顺序依次执行，让对应的组件更新，组件只要更新，就可以从容器中获取最新的状态信息渲染
 * 4. 创建容器的时候，需要传递 reducer
 *    const initial = {...} 初始状态
 *    function reducer(state = initial, action) {
 *        state 容器中的状态
 *        action 派发的行为对象，必须具有 type 属性
 *        switch(action.type) {
 *            根据传递的 type 不同，修改不同的状态信息
 *        }
 *        return state 返回的信息会替换 store 容器中的公共状态
 *    }
 * 5. 派发任务，通知 reducer 执行修改状态 store.dispatch({ type: xxx, ... })
 *
 * 若多个组件都需要用到创建的 store，可以在其公共的根组件中，将其放入上下文中，后续只要是该根组件的后代组件，都可以直接使用
 */

export function ReduxView() {
  return (
    <StoreContext.Provider value={{ store }}>
      <ReduxHeader></ReduxHeader>
    </StoreContext.Provider>
  );
}

function ReduxHeader() {
  const { store } = useContext(StoreContext);
  const { title } = store.getState(); // 获取 store 容器中的状态信息
  // 组件初始渲染 or 更新后，将让组件更新的方法，放入 store 容器的事件池中
  const [count, setCount] = useState(0);
  function update() {
    setCount(count + 1);
  }
  useEffect(() => {
    const unSubscribe = store.subscribe(update); // unSubscribe 执行可以将刚刚放入事件池中的方法移除掉
    return () => {
      unSubscribe(); // 当组件更新时，将上一个闭包中放入事件池的方法移除掉
    };
  }, [count]);
  return (
    <>
      <p>{title}</p>
      <button
        onClick={() => {
          store.dispatch({
            type: 'titleChange'
          });
        }}
      >
        click
      </button>
    </>
  );
}
