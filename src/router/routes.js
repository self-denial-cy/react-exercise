import Home from '../views/home';
// import About from '../views/about';
// import My from '../views/my';
import { A, B, C } from '../views/home';
import { lazy } from 'react';

/**
 * 配置路由表，数组中每一项都是一个路由规则
 *    redirect 属性控制这一项是否是重定向
 *    from 来源地址
 *    to 重定向目标地址
 *    exact 是否精准匹配
 *    path 匹配的路径
 *    component 匹配到要渲染的组件
 *    name 路由名称
 *    meta 路由元信息
 *    children 子路由
 */

const _import = require(`./_import_${process.env.NODE_ENV}`);
// const _import = require('./_import_production');

export const childRoutes = [
  {
    redirect: true,
    exact: true,
    from: '/home',
    to: '/home/a'
  },
  {
    path: '/home/a',
    component: A,
    name: 'a',
    meta: {},
    children: []
  },
  {
    path: '/home/b',
    component: B,
    name: 'b',
    meta: {},
    children: []
  },
  {
    path: '/home/c',
    component: C,
    name: 'c',
    meta: {},
    children: []
  },
  {
    redirect: true,
    to: '/'
  }
];

export const routes = [
  {
    redirect: true,
    exact: true,
    from: '/',
    to: '/home'
  },
  {
    path: '/home',
    component: Home,
    name: 'home',
    meta: {},
    children: childRoutes
  },
  {
    path: '/about/:id?',
    component: _import('about'),
    name: 'about',
    meta: {},
    children: []
  },
  {
    path: '/my',
    component: _import('my'),
    name: 'my',
    meta: {},
    children: []
  },
  {
    redirect: true,
    to: '/'
  }
];
