import PropTypes from 'prop-types';
import { Children } from 'react';

// 函数式组件
export default function FunctionalComponent(props) {
  console.log(props);
  let { children } = props;
  // children 可能是数组、对象、undefined，因此通过 react 提供的 Children 工具集来处理
  children = Children.toArray(children);
  const headerSlot = [],
    footerSlot = [],
    defaultSlot = [];
  children.forEach((child) => {
    if (child.props.slot === 'header') {
      headerSlot.push(child);
    } else if (child.props.slot === 'footer') {
      footerSlot.push(child);
    } else {
      defaultSlot.push(child);
    }
  });
  return (
    <>
      {headerSlot}
      <div>我是一个函数式组件</div>
      {footerSlot}
    </>
  );
}

// 通过 defaultProps 设置 props 的默认值
FunctionalComponent.defaultProps = {
  text: '我是一个默认值',
  title: '函数式组件'
};

// 通过设置 propTypes 结合 prop-types 包实现对 props 的规则校验【后续 react 结合 ts 的话，可以通过 ts 的类型检查来校验】
FunctionalComponent.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string
};

/**
 * 函数式组件是静态组件，适用于第一次渲染后就不会再变化的，不需要与用户产生交互的部分
 * 但是大部分情况下，都需要在第一次渲染后，基于用户交互更新组件内容，以此呈现出不同的渲染效果【可选方案有类组件、Hooks 组件【在函数式组件中，使用 Hooks 函数】】
 */
