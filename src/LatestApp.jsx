import {
  HashRouter,
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Link,
  NavLink,
  Outlet,
  useNavigate,
  useLocation,
  useSearchParams,
  useParams
} from 'react-router-dom-v6';

/**
 * react-router-dom v6 中移除了 Switch、Redirect、withRouter 组件
 * Navigate 组件替代了 Redirect 组件
 * withRouter 得靠自行实现一个 HOC 高阶组件替代
 * 在 v6 版本中，即使当前组件基于 Route 匹配渲染的，也无法基于 props 获取到 history、location、match 相关信息
 * 想要获取这些信息，只能通过 Hooks 函数获取【组件还是必须在 HashRouter 或 BrowserRouter 中】
 * 在 v6 版本中，路由的隐式传参信息在页面刷新后依旧存在，这与 v5 版本不一样
 */

export default function LatestApp() {
  return (
    <HashRouter>
      <div>
        <span>这里是单页面应用，即将开始使用 React Router V6</span>
        <span> | </span>
        <Navigation></Navigation>
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
          <Route path="/about/:id?" element={<About></About>}></Route>
          <Route path="/my" element={<My></My>}></Route>
          <Route path="*" element={<Navigate to="/" replace></Navigate>}></Route>
        </Routes>
      </div>
    </HashRouter>
  );
}

function Navigation() {
  const navigate = useNavigate();
  return (
    <>
      <button
        onClick={() => {
          // navigate('/my?a=1&b=2&c=3');
          navigate({
            pathname: '/my',
            search: 'a=1&b=2&c=3'
          });
        }}
      >
        search 传参
      </button>
      <button
        onClick={() => {
          // navigate('/about/123');
          navigate({
            pathname: '/about/123'
          });
        }}
      >
        params 传参
      </button>
      <button
        onClick={() => {
          navigate('/about', {
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
  console.log(useParams());

  const location = useLocation();
  console.log(location.state);
  return (
    <>
      <div>关于</div>
    </>
  );
}

export function My() {
  const location = useLocation();
  console.log(location.search.slice(1));
  console.log(useSearchParams());
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
