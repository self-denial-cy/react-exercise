import { HashRouter, Routes, Route, Navigate, Link, NavLink, Outlet } from 'react-router-dom-v6';

/**
 * react-router-dom v6 中移除了 Switch、Redirect、withRouter 组件
 * Navigate 组件替代了 Redirect 组件
 * withRouter 得靠自行实现一个 HOC 高阶组件替代
 */

export default function LatestApp() {
  return (
    <HashRouter>
      <div>
        <span>这里是单页面应用，即将开始使用 React Router V6</span>
      </div>
      {/* 路由导航 */}
      <nav>
        <NavLink to="/home">首页</NavLink>
        <span> | </span>
        <NavLink to="/about">关于</NavLink>
        <span> | </span>
        <NavLink to="/my">我的</NavLink>
      </nav>
      {/* 路由容器 */}
      <div>
        {/* 所有的路由匹配规则放在 Routes 中
            每一条匹配规则，还是基于 Route 组件
              路由匹配成功，不再基于 component、render 渲染组件，而是基于 element 渲染组件，语法也有所变化
              不再需要 Switch，默认就是只要匹配成功，就不再向下匹配
              不再需要 exact，默认每一项都是精准匹配
            原有的 Redirect 操作，被 Navigate 替代，遇到 Navigate 组件，就会跳转到其 to 属性指向的地址
        */}
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace></Navigate>}></Route>
          <Route path="/home" element={<Home></Home>}>
            {/* v6 版本中，要求所有的路由匹配规则【二级或多级路由】不再分散到各个组件中，而是写在一起进行处理 */}
            <Route path="/home" element={<Navigate to="/home/a" replace></Navigate>}></Route>
            <Route path="/home/a" element={<A></A>}></Route>
            <Route path="/home/b" element={<B></B>}></Route>
            <Route path="/home/c" element={<C></C>}></Route>
          </Route>
          <Route path="/about" element={<About></About>}></Route>
          <Route path="/my" element={<My></My>}></Route>
          <Route path="*" element={<Navigate to="/" replace></Navigate>}></Route>
        </Routes>
      </div>
    </HashRouter>
  );
}

export function Home() {
  return (
    <>
      <div>首页</div>
      <nav>
        <Link to="/home/a">A</Link>
        <span> | </span>
        <Link to="/home/b">B</Link>
        <span> | </span>
        <Link to="/home/c">C</Link>
      </nav>
      <div>
        {/* 类似 Vue Router 中的 router-view 组件 */}
        <Outlet></Outlet>
      </div>
    </>
  );
}

export function About() {
  return (
    <>
      <div>关于</div>
    </>
  );
}

export function My() {
  return (
    <>
      <div>我的</div>
    </>
  );
}

export function A() {
  return (
    <>
      <div>A</div>
    </>
  );
}

export function B() {
  return (
    <>
      <div>B</div>
    </>
  );
}

export function C() {
  return (
    <>
      <div>C</div>
    </>
  );
}
