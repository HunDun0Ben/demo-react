// src/app.ts
import RightContent from '@/components/RightContent';
import { fetchLocalUserInfo, NoLoginedHandler } from '@/utils/auth';
import { RunTimeLayoutConfig } from '@umijs/max';
import { requestConfig } from './models/request';

export const layout: RunTimeLayoutConfig = ({}) => {
  return {
    title: 'demo',
    logo: 'https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg',
    menu: {
      locale: false,
    },
    rightContentRender: () => <RightContent />,
  };
};

// 定义初始状态类型
export interface InitialStateType {
  currentUser?: API.UserInfo | null;
  settings?: Record<string, any>;
}

// 获取初始状态
export async function getInitialState(): Promise<InitialStateType> {
  console.log('应用初始化');
  const currentUser = await fetchLocalUserInfo();
  if (!currentUser) {
    // 根据具体需求决定是否跳转
    NoLoginedHandler();
  }
  // todo: 其他信息的初始化, 例如加载一些其他配置
  return {
    currentUser,
  };
}

export const request = requestConfig;
