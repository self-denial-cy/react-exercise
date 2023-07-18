import 'react-app-polyfill/stable'; // polyfill
import React from 'react';
import ReactDOM from 'react-dom/client';
import FunctionalComponent from './components/FunctionalComponent';
import Dialog from './components/Dialog';
import ClassComponent from './components/ClassComponent';
import ClassComponentPure from './components/ClassComponentPure';
import RefComponent from './components/RefComponent';
import StateView from './views/state';
import SyntheticSyntaxView from './views/synthetic-syntax';
import SyntheticView from './views/synthetic';
import HookComponent from './components/HookComponent';
import { ClassComponentContext, FunctionalComponentContext } from './views/context';
import { ReduxView } from './views/redux';
import './decorator'; // 装饰器
import { MobxClassView, MobxFunctionalView } from './views/mobx';
import App from './App';

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
    <ClassComponentPure></ClassComponentPure>
    <RefComponent></RefComponent>
    <StateView></StateView>
    <SyntheticSyntaxView></SyntheticSyntaxView>
    <SyntheticView></SyntheticView>
    <HookComponent x={13} y={14}></HookComponent>
    <ClassComponentContext></ClassComponentContext>
    <FunctionalComponentContext></FunctionalComponentContext>
    <ReduxView></ReduxView>
    <MobxClassView></MobxClassView>
    <MobxFunctionalView></MobxFunctionalView>
    <hr />
    <App></App>
  </>
);

// DOM-DIFF 差异不大，会复用组件【因此对于 ClassComponent 来说，实例不变，只是修改了实例的 props】
setTimeout(() => {
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
      <ClassComponent title="这是 5 秒后传递的标题"></ClassComponent>
      <ClassComponentPure></ClassComponentPure>
      <RefComponent></RefComponent>
      <StateView></StateView>
      <SyntheticSyntaxView></SyntheticSyntaxView>
      <SyntheticView></SyntheticView>
      <HookComponent x={13} y={14}></HookComponent>
      <ClassComponentContext></ClassComponentContext>
      <FunctionalComponentContext></FunctionalComponentContext>
      <ReduxView></ReduxView>
      <MobxClassView></MobxClassView>
      <MobxFunctionalView></MobxFunctionalView>
      <hr />
      <App></App>
    </>
  );
}, 2000);

// ! 78
