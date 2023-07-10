import React from 'react';
import { flushSync } from 'react-dom';

export default class Home extends React.Component {
  state = {
    x: 1,
    y: 1,
    z: 1
  };

  // handleClick() {} // Error: this 为 undefined
  handleClick = (e) => {
    console.log(e);
    console.log(this);
    this.setState(
      {
        x: 100
      },
      () => {
        console.log('setState callback'); // 3
      }
    );
    console.log(this.state.x); // 这时 x 还是 1
    setTimeout(() => {
      console.log(this.state.x); // 这时 x 是 100
    });
  };

  handleClick2 = () => {
    const { x, y, z } = this.state;
    setTimeout(() => {
      this.setState({ x: x + 1 });
    }, 1001);
    setTimeout(() => {
      this.setState({ y: y + 1 });
    }, 1002);
    setTimeout(() => {
      this.setState({ z: z + 1 });
    }, 1003);
    /**
     * 浏览器有个最快反应时间，定时器时间间隔不大，浏览器能反应过来的情况下，会将几个任务一起丢执行栈中，处于同一个上下文中执行
     * 因此上面几个状态变更会合并到同一个上下文中执行，只会触发一次视图更新
     */
  };

  handleClick3 = () => {
    const { x, y, z } = this.state;
    setTimeout(() => {
      console.log('setTimeout1');
      this.setState({ x: x + 1 }, () => {
        console.log('after setState1');
      });
    }, 1100);
    setTimeout(() => {
      console.log('setTimeout2');
      this.setState({ y: y + 1 }, () => {
        console.log('after setState2');
      });
    }, 1200);
    setTimeout(() => {
      console.log('setTimeout3');
      this.setState({ z: z + 1 }, () => {
        console.log('after setState3');
      });
    }, 1300);
    /**
     * setState 行为上更像异步微任务【与 Vue 中 nextTick 机制类似，但是不知道有没有采用优雅降级的方式 https://github.com/self-denial-cy/mini-vue/blob/main/exercise1/src/observe/watcher.js】
     */
  };

  handleClick4 = () => {
    for (let i = 0; i < 20; i++) {
      this.setState({
        z: this.state.z + 1 // 因为更新队列刷新之前，this.state.z 一直为 1，这里相当于给 z 赋值了 20 次 1【暂不清楚有无去重】，然后最后触发一次视图更新
      });
    }
  };

  handleClick5 = () => {
    for (let i = 0; i < 20; i++) {
      /**
       * setState 也支持传入函数，到更新队列刷新时，会将 this.state 当作参数传入该函数
       * 这里相当于执行了 20 次函数，每次都将实时的 state 传入，赋值流程【2,3,4,...21】，最后触发一次视图更新
       */
      this.setState((preState) => {
        return {
          z: preState.z + 1
        };
      });
    }
  };

  componentDidUpdate() {
    console.log('componentDidUpdate'); // 2
  }

  render() {
    console.log('视图渲染 RENDER'); // 1
    const { x, y, z } = this.state;
    return (
      <>
        <div>我是首页</div>
        <div>
          x: {x} y: {y} z: {z}
        </div>
        <button onClick={this.handleClick}>click</button>
        <button onClick={this.handleClick2}>click2</button>
        <button onClick={this.handleClick3}>click3</button>
        <button onClick={this.handleClick4}>click4</button>
        <button onClick={this.handleClick5}>click5</button>
      </>
    );
  }

  // shouldComponentUpdate() {
  //   return false;
  // }
}

/**
 * setState([partialState], [callback])
 * [partialState] 支持部分状态更改
 * [callback] 状态变更，视图更新完毕后触发执行【发生在 componentDidUpdate 钩子后】
 * 注意，componentDidUpdate 会在任何状态变更后触发执行，但是这里的 [callback] 只会在指定的状态变更后触发执行
 * 注意，即使基于 shouldComponentUpdate 阻止了视图更新，虽然 componentDidUpdate 不会被触发，但是这里的 [callback] 依旧会触发
 */

/**
 * 在 React18 中，setState 在任何地方【合成事件、周期函数、定时器...】执行，都是【异步操作】
 *    React18 有一套更新队列的机制【updater】
 *    基于异步操作，实现状态的【批处理】
 * 减少视图更新的次数，降低渲染消耗的性能，让更新的逻辑和流程更加清晰 & 稳健
 */

/**
 * 在 React16 中，setState 在合成事件【JSX 元素中基于类似 onClick 形式绑定的事件】、周期函数中，setState 的操作是异步的
 * 但是如果 setState 出现在其它异步操作中【比如，定时器、手动获取 DOM 元素做的事件绑定等】，它将变为同步操作【立即变更状态及更新视图】
 */

/**
 * ReactDOM 提供了一 flushSync API，可以立即刷新更新队列【updater】，将当前更新队列中的状态变更掉以及触发一次视图更新
 */
