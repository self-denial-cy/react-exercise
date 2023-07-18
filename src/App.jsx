import React from 'react';
import { HashRouter, BrowserRouter, Route, Switch, Redirect, Link } from 'react-router-dom';
import Home from './views/home';
import About from './views/about';
import My from './views/my';
import NotFound from './views/404';

/**
 * 基于 HashRouter 或 BrowserRouter 将要渲染的内容包裹起来，开启路由控制
 * 后续使用到的 Route、Link 等都只能在 HashRouter 或 BrowserRouter 中使用
 * 开启后，默认导航到 #/ 或 /
 * Link 组件类似 Vue 中的 router-link 组件
 *
 * 路由地址匹配规则
 * 页面地址【浏览器 URL 后的地址】
 * 路由地址【Route 组件中的 path 属性】
 * 页面地址 路由地址 非精准匹配 精准匹配
 * /       /        true      true
 * /       /login   false     false
 * /login  /        true      false
 * /a/b    /a       true      false
 * /a/b/   /a/b     true      true  【忽略地址最后一个 /】
 * /b/a    /a       false     false
 */

export default function App() {
  return (
    <HashRouter>
      <div>这里是单页面应用，即将开始使用 React Router</div>
      {/* 路由导航 */}
      <nav>
        <Link to="/">首页</Link>
        <span> | </span>
        <Link to="/about">关于</Link>
        <span> | </span>
        <Link to="/my">我的</Link>
      </nav>
      {/* 路由容器 */}
      <div>
        {/* Switch 保证了只要匹配到了路由，就不会再向下匹配 */}
        <Switch>
          {/* exact 属性开启了精准匹配 */}
          <Route exact path="/" component={Home}></Route>
          <Route path="/about" component={About}></Route>
          <Route path="/my" component={My}></Route>
          {/* 最后一项，path 设置为 * 或者不写，表示以上都不匹配，则执行这个规则 */}
          {/* <Route component={NotFound}></Route> */}
          {/* 也可以不设置 404 页面，而是重定向到首页
              Redirect 组件的 from 属性指定匹配地址，只有当匹配上，才会走重定向逻辑，以下未指定 from 属性，表示无论从哪来，都走
              重定向逻辑
              Redirect 组件还可以开启 exact 属性，修饰 from 属性的匹配规则是精准匹配还是非精准匹配
              to 属性就是要重定向的目标地址
          */}
          <Redirect to="/"></Redirect>
        </Switch>
      </div>
    </HashRouter>
  );
}
