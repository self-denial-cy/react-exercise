import { useState } from 'react';

/**
 * 函数式组件 or Hook 组件不是类组件，所以没有组件实例的概念【调用组件不再是创建类的实例，而是执行函数，产生一个私有上下文】
 * 所以，在函数式组件 or Hook 组件中不涉及 this 的处理
 */

/**
 * useState React Hook 函数之一，目的是在函数式组件中使用状态，并且基于状态的变更，触发视图更新
 * useState(initialValue) 执行 useState，传递的 initialValue 是初始的状态值
 * 执行该方法，返回结果是一个数组【状态值、修改状态的方法【可以触发视图更新】】
 */

export default function HookComponent() {
  const [count, setCount] = useState(0);
  return (
    <>
      <div>我是一个 Hook 组件</div>
      <button onClick={() => setCount(count + 1)}> {count}</button>
    </>
  );
}

// TODO 33 40:01
