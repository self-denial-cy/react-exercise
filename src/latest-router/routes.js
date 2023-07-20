import { Navigate } from 'react-router-dom-v6';
import { Home, About, My, A, B, C } from '../LatestApp';
import { lazy } from 'react';

/**
 * 配置路由表，数组中每一项都是一个路由规则
 *    path 匹配的路径
 *    component 匹配到要渲染的组件
 *    name 路由名称
 *    meta 路由元信息
 *    children 子路由
 */

export const routes = [
  {
    path: '/',
    component: () => <Navigate to="/home" replace></Navigate>
  },
  {
    path: '/home',
    component: Home,
    name: 'home',
    children: [
      {
        path: '/home',
        component: () => <Navigate to="/home/a" replace></Navigate>
      },
      {
        path: '/home/a',
        component: A
      },
      {
        path: '/home/b',
        component: B
      },
      {
        path: '/home/c',
        component: C
      }
    ]
  },
  {
    path: '/about/:id?',
    component: About,
    name: 'about'
  },
  {
    path: '/my',
    component: My,
    name: 'my'
  },
  {
    path: '*',
    component: () => <Navigate to="/" replace></Navigate>
  }
];
