import React, { Suspense } from 'react';
import { HashRouter, BrowserRouter, Route, Switch, Redirect, Link, useHistory, NavLink } from 'react-router-dom';
import Home from './views/home';
import About from './views/about';
import My from './views/my';
import NotFound from './views/404';
import { RouterView, routes } from './router';
import qs from 'qs';

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
      <div>
        <span>这里是单页面应用，即将开始使用 React Router</span>
        <span> | </span>
        <Navigation></Navigation>
      </div>
      {/* 路由导航 */}
      <nav>
        {/* NavLink 和 Link 组件用法一致，但是 NavLink 会给与当前路由地址匹配的 a 标签添加一个 active 的类，用于设置选中状态样式 */}
        <NavLink to="/home">首页</NavLink>
        <span> | </span>
        <NavLink to="/about">关于</NavLink>
        <span> | </span>
        <NavLink to="/my">我的</NavLink>
      </nav>
      {/* 路由容器 */}
      <div>
        {/* Switch 保证了只要匹配到了路由，就不会再向下匹配 */}
        <Switch>
          {/* exact 属性开启了精准匹配 */}
          <Redirect exact from="/" to="/home"></Redirect>
          <Route path="/home" component={Home}></Route>
          <Route
            path="/about/:id?"
            render={(props) => {
              return (
                // 懒加载的路由组件需要包裹在 Suspense 组件中
                <Suspense>
                  <About {...props}></About>
                </Suspense>
              );
            }}
          ></Route>
          <Route
            path="/my"
            render={(props) => {
              return (
                <Suspense>
                  <My {...props}></My>
                </Suspense>
              );
            }}
          ></Route>
          {/* <Route
            path="/404"
            render={() => {
              // 当路由地址匹配时，将 render 函数执行，返回值就是渲染的内容
              // 在此函数中，可以添加一些逻辑校验，例如，登录态校验
              const isLogin = true;
              if (isLogin) return <NotFound></NotFound>;
              return <Redirect to="/"></Redirect>;
            }}
          ></Route> */}
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
      <hr />
      <div>
        <RouterView routes={routes}></RouterView>
      </div>
    </HashRouter>
  );
}

function Navigation() {
  const history = useHistory();
  return (
    <>
      <button
        onClick={() => {
          /**
           * 类似 Vue Router 的 query 传参
           * 传递的信息出现在 URL 中，但是丑、不安全、有长度限制
           * 信息是显式的，即使在目标路由刷新页面，传递的信息依旧存在
           */
          // history.push('/my?a=1&b=2&c=3');
          // history.push({
          //   pathname: '/my',
          //   search: 'a=1&b=2&c=3'
          // });
          history.push({
            pathname: '/my',
            search: qs.stringify({
              a: 1,
              b: 2,
              c: 3
            })
          });
        }}
      >
        search 传参
      </button>
      <button
        onClick={() => {
          /**
           * 类似 Vue Router 的 params 传参
           * 传递的信息也在 URL 中，比问号传参好看些，但是也存在安全问题和长度限制
           * 信息是显式的，即使在目标路由刷新页面，传递的信息依旧存在
           */
          // history.push('/about/123');
          history.push({
            pathname: '/about/123'
          });
        }}
      >
        params 传参
      </button>
      <button
        onClick={() => {
          /**
           * 传递的信息不会出现在 URL 中，安全、美观、无长度限制
           * 但是在目标路由刷新页面，会丢失传递信息
           */
          history.push({
            pathname: '/about',
            state: {
              id: 999,
              text: '我是隐式信息哟~'
            }
          });
        }}
      >
        state 传参
      </button>
    </>
  );
}
