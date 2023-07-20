import { Navigate } from 'react-router-dom-v6';
import { Home, About, My, A, B, C } from '../LatestApp';

/**
 * 配置路由表，数组中每一项都是一个路由规则
 *    path 匹配的路径
 *    element 匹配到要渲染的组件
 *    name 路由名称
 *    meta 路由元信息
 *    children 子路由
 */

export const routes = [
  {
    path: '/',
    element: () => <Navigate to="/home" replace></Navigate>
  },
  {
    path: '/home',
    element: Home,
    name: 'home',
    children: [
      {
        path: '/home',
        element: () => <Navigate to="/home/a" replace></Navigate>
      },
      {
        path: '/home/a',
        element: A
      },
      {
        path: '/home/b',
        element: B
      },
      {
        path: '/home/c',
        element: C
      }
    ]
  },
  {
    path: '/about/:id?',
    element: About,
    name: 'about'
  },
  {
    path: '/my',
    element: My,
    name: 'my'
  },
  {
    path: '*',
    element: () => <Navigate to="/" replace></Navigate>
  }
];
