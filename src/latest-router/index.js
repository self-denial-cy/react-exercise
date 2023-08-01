import { routes } from './routes';
import { Routes, Route, useNavigate, useLocation, useParams, useSearchParams } from 'react-router-dom-v6';
import { Suspense } from 'react';

function createRoute(routes) {
  return (
    <>
      {routes.map((item, index) => {
        const { path, children } = item;
        // 路由匹配成功，不直接渲染 component，而是渲染 Element，在 Element 中做一些特殊处理后，再去渲染 component
        return (
          <Route key={index} path={path} element={<Element {...item} />}>
            {/* 递归处理子路由 */}
            {Array.isArray(children) ? createRoute(children) : null}
          </Route>
        );
      })}
    </>
  );
}

function Element(props) {
  const { component: Component } = props;
  // 获取到路由信息，基于属性传递给渲染组件
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const [searchParams] = useSearchParams();
  return <Component navigate={navigate} location={location} params={params} searchParams={searchParams} />;
}

export default function RouterView() {
  return (
    // 考虑到异步路由的情况
    <Suspense fallback={<>正在加载中...</>}>
      <Routes>{createRoute(routes)}</Routes>
    </Suspense>
  );
}

export function withRouter(Component) {
  return function HOC(props) {
    // 获取到路由信息，基于属性传递给渲染组件
    const navigate = useNavigate();
    const location = useLocation();
    const params = useParams();
    const [searchParams] = useSearchParams();
    return <Component {...props} navigate={navigate} location={location} params={params} searchParams={searchParams} />;
  };
}
