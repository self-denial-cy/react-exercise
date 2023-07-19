import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Suspense } from 'react';

// 路由视图组件，基于属性传递路由表进来，根据路由表动态生成路由的匹配规则
export function RouterView(props) {
  const { routes } = props;
  return (
    <Switch>
      {routes.map((item, index) => {
        const { redirect, from, to, exact, path, component: Component, name, meta, children } = item;
        const routeProps = {};
        if (from) routeProps.from = from;
        if (to) routeProps.to = to;
        if (exact) routeProps.exact = exact;
        if (path) routeProps.path = path;
        if (redirect) {
          return <Redirect key={index} {...routeProps}></Redirect>;
        }
        return (
          <Route
            key={index}
            {...routeProps}
            render={(props) => {
              // 当路由地址匹配时，将 render 函数执行，返回值就是渲染的内容
              // 在此函数中，可以添加一些逻辑校验，例如，登录态校验
              // 类似 Vue Router 中的路由守卫
              return (
                // 懒加载的路由组件需要包裹在 Suspense 组件中
                <Suspense fallback={<>正在加载中...</>}>
                  <Component {...props}></Component>
                </Suspense>
              );
            }}
          ></Route>
        );
      })}
    </Switch>
  );
}

RouterView.defaultProps = {
  routes: []
};

RouterView.propTypes = {
  routes: PropTypes.array.isRequired
};

export * from './routes';
