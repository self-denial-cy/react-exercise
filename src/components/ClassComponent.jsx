import React from 'react';
import PropTypes from 'prop-types';

/**
 * 创建一个类组件，要求必须继承 React.Component or React.PureComponent
 * 一般使用 ES6 class 语法，使用 ES5 构造函数也可以，不过相当麻烦
 */
class ClassComponent extends React.Component {
  /**
   * 1. 初始化属性 && 规则校验【先规则校验，再初始化属性】
   * 可以通过显式 constructor 传递 props | 不写 constructor，React 内部也会处理 props【推荐】
   * 这里的 props 也是被冻结的、只读的
   */
  // constructor(props) {
  //   super(props);
  //   this.state = {};
  // }

  /**
   * 2. 初始化状态【后期修改状态，可以触发视图的更新】
   * 可以通过手动初始化一个 state，也可以什么都不做，React 默认会往实例上挂载一个 state【默认值为 null】
   */
  state = {
    count: 0
  };

  // 设置 props 默认值
  static defaultProps = {
    title: '这是一个类组件'
  };
  // 设置 props 类型规则
  static propTypes = {
    title: PropTypes.string
  };

  /**
   * 4. 触发 render 渲染视图
   * 在 render 方法中返回需要渲染的视图
   */
  render() {
    let { title } = this.props;
    let { count } = this.state;
    return (
      <>
        <div>{title}</div>
        <button
          onClick={() => {
            // 与 Vue 不同，React 必须显式调用 setState 触发视图更新
            this.setState({
              count: count + 1
            });
            // 或者直接修改 state，然后通过 forceUpdate 强制更新视图【不推荐】
          }}
        >
          {count}
        </button>
      </>
    );
  }

  /**
   * 3. 触发生命周期钩子
   */
  // componentWillMount() {
  //   // 组件第一次渲染之前，目前可以用，但是未来可能会被移除【不建议使用】
  //   // 类似 Vue 中的 beforeCreated or created
  // }
  UNSAFE_componentWillMount() {
    // 如果开启了 React.StrictMode，使用 UNSAFE_componentWillMount 控制台会报红色警告
    // 与 componentWillMount 一样，但是控制台不会再触发黄色警告
  }

  componentDidMount() {
    // 组件第一次渲染完毕，类似 Vue 中的 mounted【页面中已经创建了真实 DOM，所以可以获取到真实 DOM】
  }
}

export default ClassComponent;

// function ClassComponent() {
//   React.Component.call(this);
//   // set property
//   this.state = {};
// }

// Object.setPrototypeOf(ClassComponent.prototype, React.Component.prototype);

// // set method
// ClassComponent.prototype.method = function () {};
