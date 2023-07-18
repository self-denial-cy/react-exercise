import React from 'react';

export default class SyntheticSyntaxView extends React.Component {
  /**
   * 合成事件【Synthetic Event】是 React 封装的一套机制，用于保证各个浏览器之间事件机制的行为统一
   */

  handleClick1() {
    console.log(this); // undefined React 内部并不是简单的 button.onclick = function() {}，而是基于事件委托实现的合成事件机制
  }

  handleClick2(e) {
    console.log(this); // 当前 About 实例
    console.log(e); // SyntheticBaseEvent 合成事件对象，也是 React 基于原生事件对象封装的事件对象，包含大部分常用的属性【没被封装的属性可以去 nativeEvent【原生事件对象】上寻找】
  }

  handleClick3 = (e) => {
    console.log(this); // 当前 About 实例
    console.log(e);
  };

  // 合成事件对象会作为最后一个参数传入
  handleClick4(x, y, e) {
    console.log(this);
    console.log(x, y, e);
  }

  handleClick5 = (x, y, e) => {
    console.log(this);
    console.log(x, y, e);
  };

  handleClick6 = (e, x, y) => {
    console.log(this);
    console.log(e, x, y);
  };

  render() {
    return (
      <>
        <div>我是关于页面</div>
        <button onClick={this.handleClick1}>click1</button>
        <button onClick={this.handleClick2.bind(this)}>click2</button>
        <button onClick={this.handleClick3}>click3</button>
        <button onClick={this.handleClick4.bind(this, 10, 20)}>click4</button>
        {/* 箭头函数内的 this 并不会被 bind、apply、call 修改 */}
        <button onClick={this.handleClick5.bind(null, 10, 20)}>click5</button>
        {/* 或者可以通过一个箭头函数接收合成事件对象，手动传递下去 */}
        <button onClick={(e) => this.handleClick6(e, 10, 20)}>click6</button>
      </>
    );
  }
}
