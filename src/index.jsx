import 'react-app-polyfill/stable'; // polyfill
import React from 'react';
import ReactDOM from 'react-dom/client';
import FunctionalComponent from './components/FunctionalComponent';
import Dialog from './components/Dialog';
import ClassComponent from './components/ClassComponent';

const rootEl = document.getElementById('root');
const root = ReactDOM.createRoot(rootEl);
root.render(
  <>
    <FunctionalComponent title="函数式组件" data={{ now: Date.now() }}>
      <span slot="header">我是具名插槽内容</span>
      <span>我是默认插槽内容</span>
      <span slot="footer">我也是具名插槽内容</span>
    </FunctionalComponent>
    <Dialog title="提示" content="我是 Dialog 组件内容">
      <button>关闭</button>
    </Dialog>
    <ClassComponent title="这是一个类组件"></ClassComponent>
  </>
);
