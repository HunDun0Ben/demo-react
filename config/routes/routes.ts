export default [
  {
    path: '/',
    redirect: '/login',
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
    access: 'isAdmin',
    component: './Access',
  },
  {
    path: '/lottery',
    name: '抽奖',
    component: './Lottery',
  },
  {
    name: '蝴蝶信息',
    icon: 'setting',
    path: '/user',
    routes: [
      {
        path: '/user/butterfly-info',
        name: '蝴蝶信息列表',
        component: './ButterflyInfo',
      },
      {
        path: '/user/upload',
        name: '上传图片',
        icon: 'upload',
        component: './ButterflyInfo/Upload',
      },
    ],
  },
];
