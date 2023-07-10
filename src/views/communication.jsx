import React from 'react';

/**
 * 父子组件通信
 * 1. 父组件可通过属性传递数据给子组件
 * 2. 子组件想修改父组件的数据 —— 父组件需将修改自己数据的方法通过属性传递给子组件，子组件执行即可
 * 3. 父组件想把一些 HTML 结构传递给子组件 —— 基于属性中的 children【插槽机制】
 * 4. 父组件中可以给子组件设置 ref，以此获取子组件的实例【子组件如果是函数式组件，可以获取其暴露的数据和方法】
 */

export class ClassCommunication extends React.Component {
  render() {
    return (
      <>
        <div>类组件通信</div>
      </>
    );
  }
}

// TODO 45 39:24
