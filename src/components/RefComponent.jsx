import React from 'react';

class RefComponent extends React.Component {
  el2 = React.createRef();

  render() {
    return (
      <>
        <div ref="txt">我被标记了，可以获取到 DOM</div>
        <div
          ref={(el) => {
            this.el = el;
          }}
        >
          哎哟，我也可以哟
        </div>
        <div ref={this.el2}>哦豁，谁不是呢</div>
        <ChildComponent
          ref={(c) => {
            this.c = c;
          }}
        ></ChildComponent>
        {/* 函数式子组件无法通过 ref 获取到组件实例，但是配合 React.forwardRef 可以获取到函数式组件内的 DOM */}
        <ChildComponent2
          ref={(c2) => {
            this.c2 = c2;
          }}
        ></ChildComponent2>
      </>
    );
  }

  componentDidMount() {
    console.log(this.refs.txt); // refs 特性已被弃用了【不推荐使用】
    console.log(this.el); // 推荐
    console.log(this.el2.current);
    console.log(this.c); // 通过 ref 标记，还可以获取子组件的实例
    console.log(this.c2);
  }
}

class ChildComponent extends React.Component {
  render() {
    return (
      <>
        <div>我是一个子组件</div>
      </>
    );
  }
}

const ChildComponent2 = React.forwardRef((props, ref) => {
  console.log(props, ref);
  return (
    <>
      <div ref={ref}>我也是一个子组件</div>
    </>
  );
});

export default RefComponent;

/**
 * 受控组件 基于修改状态/属性，触发视图更新，实现需求【推荐】
 * 非受控组件 基于 ref 获取 DOM，直接操作 DOM 元素，实现需求【偶尔】
 */
