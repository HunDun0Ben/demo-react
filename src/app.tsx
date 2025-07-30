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
  console.log('getInitialState');
  const currentUser = await fetchLocalUserInfo();
  if (!currentUser) {
    NoLoginedHandler();
  }
  // todo: 其他信息的初始化
  return {
    currentUser,
  };
}

export const request = requestConfig;
