export default [
  {
    path: '/',
    redirect: '/home',
  },
  {
    name: '首页',
    path: '/login',
    component: './Login',
    layout: false,
  },
  {
    name: '首页',
    path: '/home',
    component: './Home',
  },
  {
    name: '权限演示',
    path: '/access',
    component: './Access',
  },
  {
    path: '/lottery',
    name: '抽奖',
    component: './Lottery',
  },
];
