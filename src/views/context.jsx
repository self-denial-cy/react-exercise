import React, { useState, useContext } from 'react';
import ClassContext from '../context/ClassContext';
import FunctionalContext from '../context/FunctionalContext';

/**
 * 对于嵌套结构较深的组件【祖先组件和后代组件】，如果基于属性一层层向下传递会非常麻烦
 * 对此，可以基于上下文方案，祖先组件将状态和变更状态的方法放在上下文中，后代组件可以直接去上下文中，获取这些信息去使用
 * 后代组件调用祖先组件放在上下文中的变更状态的方法，触发祖先组件更新，祖先组件会把最新的状态信息重新放在上下文中
 */

/**
 * 上下文方案
 * 1. 创建一个上下文对象，用来管理上下文中的信息
 * 2. 将祖先组件中的状态和变更状态的方法放入上下文对象中
 * 3. 在后代组件中，获取上下文中的信息，然后使用即可
 */

export class ClassComponentContext extends React.Component {
  state = {
    okNum: 10,
    nokNum: 5
  };

  change = (type) => {
    const { okNum, nokNum } = this.state;
    if (type === 'ok') {
      this.setState({ okNum: okNum + 1 });
    } else if (type === 'nok') {
      this.setState({ nokNum: nokNum + 1 });
    }
  };

  render() {
    const { okNum, nokNum } = this.state;
    return (
      <ClassContext.Provider
        value={{
          okNum,
          nokNum,
          change: this.change
        }}
      >
        <div>类组件上下文通信方案【{okNum + nokNum}】</div>
        <ChildClassComponent1></ChildClassComponent1>
        <ChildClassComponent2></ChildClassComponent2>
      </ClassContext.Provider>
    );
  }
}

class ChildClassComponent1 extends React.Component {
  static contextType = ClassContext;

  render() {
    const { okNum, nokNum } = this.context;
    return (
      <>
        <p>ok: {okNum}</p>
        <p>nok: {nokNum}</p>
      </>
    );
  }
}

class ChildClassComponent2 extends React.Component {
  render() {
    return (
      <ClassContext.Consumer>
        {(context) => {
          const { change } = context;
          return (
            <>
              <button onClick={() => change('ok')}>ok</button>
              <button onClick={() => change('nok')}>nok</button>
            </>
          );
        }}
      </ClassContext.Consumer>
    );
  }
}

export function FunctionalComponentContext() {
  const [okNum, setOkNum] = useState(10);
  const [nokNum, setNokNum] = useState(5);

  function change(type) {
    if (type === 'ok') {
      setOkNum(okNum + 1);
    } else if (type === 'nok') {
      setNokNum(nokNum + 1);
    }
  }

  return (
    <FunctionalContext.Provider
      value={{
        okNum,
        nokNum,
        change
      }}
    >
      <div>函数式组件上下文通信方案【{okNum + nokNum}】</div>
      <ChildFunctionalComponent1></ChildFunctionalComponent1>
      <ChildFunctionalComponent2></ChildFunctionalComponent2>
    </FunctionalContext.Provider>
  );
}

function ChildFunctionalComponent1() {
  return (
    <FunctionalContext.Consumer>
      {(context) => {
        const { okNum, nokNum } = context;
        return (
          <>
            <p>ok: {okNum}</p>
            <p>nok: {nokNum}</p>
          </>
        );
      }}
    </FunctionalContext.Consumer>
  );
}

function ChildFunctionalComponent2() {
  const { change } = useContext(FunctionalContext);
  return (
    <>
      <button onClick={() => change('ok')}>ok</button>
      <button onClick={() => change('nok')}>nok</button>
    </>
  );
}
