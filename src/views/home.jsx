import {
  Link,
  Route,
  Redirect,
  Switch,
  useHistory,
  useLocation,
  useRouteMatch,
  useParams,
  /**
   * 用来解决不是 Route 组件的 component 指定或 render 函数返回但是在 HashRouter 或 BrowserRouter 中的类组件无法获取
   * 相关路由信息的问题，相当于在类组件外层包裹了一层 HOC 高阶组件
   */
  withRouter
} from 'react-router-dom';
import { RouterView, childRoutes } from '../router';

export default function Home() {
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
        <Switch>
          <Redirect exact from="/home" to="/home/a"></Redirect>
          <Route path="/home/a" component={A}></Route>
          <Route path="/home/b" component={B}></Route>
          <Route path="/home/c" component={C}></Route>
          <Redirect to="/"></Redirect>
        </Switch>
      </div>
      <hr />
      <div>
        <RouterView routes={childRoutes}></RouterView>
      </div>
    </>
  );
}

export function A(props) {
  /**
   * 下面这些东西就类似 Vue Router 中的 $route 和 $router 的混合体
   * 这些信息只有在 HashRouter 或 BrowserRouter 中的 Route 组件的 component 属性指定的组件或 render 函数手动传递 props 返回的
   * 组件才可以通过 props 属性访问
   * 注意，在 HashRouter 或 BrowserRouter 中的组件【不是 Route 组件的 component 指定的组件，也不是 render 函数返回的组件】，也
   * 可以通过下面几个 Hooks 函数获取到相关信息
   */
  console.log(props); // {history: {…}, location: {…}, match: {…}, staticContext: undefined}
  // 通过下面几个 Hooks 函数也可以得到同样的信息
  console.log(useHistory());
  console.log(useLocation());
  console.log(useRouteMatch());
  return <div>A</div>;
}

export function B() {
  return <div>B</div>;
}

export function C() {
  return <div>C</div>;
}
