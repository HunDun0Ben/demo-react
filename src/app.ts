// src/app.ts
import { message } from 'antd';
import { history } from 'umi';

// 定义初始状态类型
export interface InitialStateType {
  currentUser?: API.UserInfo;
  settings?: any;
  loading?: boolean;
}

const emptyInitialState: InitialStateType = {
  currentUser: undefined,
  settings: {},
  loading: false,
};

// 获取初始状态
export async function getInitialState(): Promise<InitialStateType> {
  const token = localStorage.getItem('token');
  // 如果没有token，返回空的初始状态
  if (!token) {
    return emptyInitialState;
  }

  try {
    const userInfo: API.UserInfo = {
      name: localStorage.getItem('username') || '',
      token: localStorage.getItem('token') || '',
    };
    return {
      currentUser: userInfo,
      settings: {}, // 可以添加其他全局设置
      loading: false,
    };
  } catch (error) {
    message.error('获取用户信息失败');
    history.push('/login');
    return emptyInitialState;
  }
}

// 路由变化监听
export function onRouteChange({ location }: any) {
  const token = localStorage.getItem('token'); // 检查登录状态
  const isLoginPage = location.pathname === '/login';
  // 如果未登录且不在登录页面，跳转到登录页面
  if (!token && !isLoginPage) {
    history.push('/login');
  }
}

export const layout = () => {
  return {
    title: 'demo',
    logo: 'https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg',
    menu: {
      locale: false,
    },
  };
};
