import { useState, useEffect } from 'react';
import { flushSync } from 'react-dom';

/**
 * 函数式组件 or Hook 组件不是类组件，所以没有组件实例的概念【调用组件不再是创建类的实例，而是执行函数，产生一个私有上下文】
 * 所以，在函数式组件 or Hook 组件中不涉及 this 的处理
 * 函数式组件 or Hook 组件更新视图时也不像类组件【走 shouldComponentUpdate 那一套机制】，而是把函数重新执行，产生一个全新的私有上下文
 * 内部代码都会重新运行
 *
 * 函数式组件 or Hook 组件的初始渲染 or 后续更新机制
 * 初始渲染，第一次渲染组件，执行函数【传递属性】，产生一个私有上下文【count 状态值，setCount 变更状态的函数】，执行由 JSX 元素编译得到的 createElement 等方法生成 virtualDOM，最后渲染为真实 DOM
 * 后续更新，比如说点击按钮，再次执行函数【传递属性】，产生一个全新的私有上下文【第二次及以后执行 useState 获取的状态值不再是传递的初始值，而是最新的状态值，变更状态的函数也是全新的】
 * 然后再次生成 virtualDOM，这个时候会进行 DOM-DIFF，然后再更新真实 DOM
 */

/**
 * useState React Hook 函数之一，目的是在函数式组件中使用状态，并且基于状态的变更，触发视图更新
 * useState(initialValue) 执行 useState，传递的 initialValue 是初始的状态值
 * 执行该方法，返回结果是一个数组【状态值、修改状态的方法【可以触发视图更新】】
 * 注意，useState 返回的变更状态的方法【和类组件中的 setState 不一样，不支持部分修改】
 * 但是，同步异步机制和类组件中的 setState 一致【React18 中在任何地方都是异步的，React16 中在合成事件、周期函数中是异步的，在定时器等其它地方中是同步的】
 * 在 Hook 组件中也支持引入 flushSync 来刷新更新队列
 *
 * var _state
 * function useState(initialValue) {
 *    if(typeof _state === 'undefined') _state = initialValue
 *    function setState(value) {
 *        _state = value
 *        通知视图更新
 *    }
 *    return [_state, setState]
 * }
 *
 * useState 自带了性能优化的机制
 * 每一次修改状态值的时候，会用最新的状态和之前的状态进行比较【基于 Object.is 作比较】
 * 如果发现新老状态一致，不会变更状态，也不会触发视图更新【这个机制类似类组件中的 PureComponent 中的 shouldComponentUpdate 的浅比较】
 * 注意，获取最新状态并不是那么简单，React 中的双 fiber 机制导致了，如果连续 setState 同样的值，在第三次才能拦截住【具体细节后续研究研究】
 */

export default function HookComponent(props) {
  /**
   * useState 可以接收一个获取初始状态的函数【基于 props 得到的初始值，或者说动态计算得到的初始值】
   * 如果这个计算逻辑写在外面，组件每次更新时都会重新计算得到初始值，但是 useState 只会在第一次初始化时使用到这个初始值
   * 后续都不再需要了，因此这些计算逻辑反而冗余了
   */
  const [position, setPosition] = useState(() => {
    const { x, y } = props;
    return [x, y];
  });

  const [count, setCount] = useState(0);

  function handleClick() {
    for (let i = 0; i < 10; i++) {
      flushSync(() => {
        setCount(count + 1);
      });
    }
  }

  console.log('HookComponent render'); // 因为双 fiber 机制会触发两次

  // 在组件初始渲染及后续更新时触发，类似 componentDidMount、componentDidUpdate
  useEffect(() => {
    console.log('@1', count); // 获取的是最新状态
  });

  // 只在组件初始渲染时触发，类似 componentDidMount【第二个参数可以传入依赖项，空数组表示无任何依赖，因此只在初始渲染时触发一次，后续任何状态变更都不会触发】
  useEffect(() => {
    console.log('@2', count); // 获取的是最新状态
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handlePositionChange() {
    const [x, y] = position;
    setPosition([x + 1, y + 1]);
  }

  // 在组件初始渲染及依赖项变更时触发【可以声明多个依赖项】
  useEffect(() => {
    console.log('@3', count); // 获取的是最新状态
  }, [count]);

  // 仅在组件更新时触发
  useEffect(() => {
    return () => {
      console.log('@4', count); // 获取的是上一次私有上下文中的状态
    };
  });

  // 永远不会触发【仅在组件更新时触发 + 无依赖项 = 永远不会触发】
  useEffect(() => {
    return () => {
      console.log('@5', count);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 仅在依赖项变更时触发【可以声明多个依赖项】
  useEffect(() => {
    return () => {
      console.log('@6', count); // 获取的是上一次私有上下文中的状态
    };
  }, [count]);

  return (
    <>
      <div>我是一个 Hook 组件</div>
      <button onClick={handleClick}> {count}</button>
      <p>
        ({position[0]}, {position[1]})
      </p>
      <button onClick={handlePositionChange}>change</button>
    </>
  );
}

// TODO 36 24:15
