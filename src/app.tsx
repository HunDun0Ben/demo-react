// src/app.ts
import RightContent from '@/components/RightContent';
import { fetchLocalUserInfo, isAcccessTokenValid } from '@/utils/auth';
import { message } from 'antd';
import { history, type RequestConfig, type RunTimeLayoutConfig } from 'umi';

// 定义初始状态类型
export interface InitialStateType {
  currentUser?: API.UserInfo | null;
  settings?: Record<string, any>;
}

const loginPath = '/login';

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

// 获取初始状态
export async function getInitialState(): Promise<InitialStateType> {
  const currentUser = await fetchLocalUserInfo();
  // todo: 其他信息的初始化
  return {
    currentUser,
  };
}

export const request: RequestConfig = {
  // https://umijs.org/docs/max/request 配置详情参考
  errorConfig: {
    errorHandler: (error: any) => {
      if (error.response) {
        // The request was made and the server responded with a status code
        if (error.response.status === 401) {
          history.push(loginPath);
        } else {
          message.error(error.response.data?.message || '请求失败');
        }
      } else {
        message.error('网络错误');
      }
    },
  },
  requestInterceptors: [
    (url: string, options: any) => {
      const isLoginRequest =
        url.includes('/login') || url.includes('/token/refresh');
      if (isLoginRequest) {
        return { url, options };
      }

      const accessToken = localStorage.getItem('accessToken');
      const expStr = localStorage.getItem('tokenExp');
      const exp = expStr ? parseInt(expStr, 10) : 0;
      if (!isAcccessTokenValid(exp)) {
        // todo: accessToken 过期. 尝试访问 /token/refresh 重新获得 token
        localStorage.clear();
        history.push(loginPath);
        // 返回一个空的promise来中断请求
        // 停止请求
        console.log(`cancel request ${url}`);
        return new Promise(() => {});
      }
      if (accessToken) {
        options.headers.Authorization = `Bearer ${accessToken}`;
      }

      return { url, options };
    },
  ],
  responseInterceptors: [
    // 直接写一个 function，作为拦截器
    (response) => {
      // The response has been received, you can process it here before it's passed to the caller.
      // const { data } = response;
      return response;
    },
  ],
};
