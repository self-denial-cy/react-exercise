import React from 'react';

class ClassComponentPure extends React.PureComponent {
  state = {
    list: [10, 20, 30]
  };

  render() {
    const { list } = this.state;
    return (
      <>
        <ul>
          {list.map((item, index) => {
            return (
              <li key={index}>
                {index + 1} - {item}
              </li>
            );
          })}
        </ul>
        <button
          onClick={() => {
            // 这里解构出来的 list 和 state 中的 list 都是同一引用地址，因此浅比较相等
            list.push((list.length + 1) * 10);
            this.setState({ list });
            this.setState({
              list: [...list] // 这里会修改 list 的引用地址，因此浅比较不相等，会触发视图更新
            });
            // this.forceUpdate(); // forceUpdate 在 PureComponent 中依旧会跳过 shouldComponentUpdate 钩子直接触发视图更新
          }}
        >
          +
        </button>
      </>
    );
  }

  // shouldComponentUpdate() {}
}

export default ClassComponentPure;

/**
 * PureComponent 和 Component 的区别
 * PureComponent 会给类组件默认添加一个 shouldComponentUpdate 钩子【不支持自定义修改】，在此钩子中，对新老属性/状态进行一个
 * 【浅比较】，如果经过比较后，发现属性 or 状态并没有改变，则返回 false【不允许更新视图】
 */

/**
 * 以上的浅比较【shallowEqual】
 * 1. 先比较新老属性/状态对象成员的数量，如果数量不一致，新老对象肯定不一样【触发视图更新】
 * 2. 迭代新老属性/状态对象，比较对象成员，但是只比较第一级，不会再深层次比较【成员是原始类型，比较值 | 成员是引用类型，比较引用地址】
 */
