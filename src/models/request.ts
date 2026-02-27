import { tokenRefresh } from '@/services/demo/loginController';
import {
  getLocalAccessToken,
  isLogined,
  LoginHandler,
  NoLoginedHandler,
  parseAccessToken,
} from '@/utils/auth';
import { message } from 'antd';
import { history, type RequestConfig } from 'umi';

const loginPath = '/login';

export const requestConfig: RequestConfig = {
  // https://umijs.org/docs/max/request 配置详情参考
  errorConfig: {
    errorThrower: (res: any) => {
      // 处理错误的业务代码
      const r = res as API.AppRes;
      // 业务错误码判断
      if (r.code !== 200) {
        const error: any = new Error(r.message);
        error.name = 'BizError';
        error.info = res;
        throw error; // 主动抛出，交由 errorHandler 处理
      }
    },
    errorHandler: (error: any) => {
      if (error.response) {
        // The request was made and the server responded with a status code
        if (error.response.status === 401) {
          // 检查是否是登录相关的请求
          const requestUrl =
            error.request.responseURL || error.request.url || error.config.url;
          const isLoginRequest =
            requestUrl.includes('/login') ||
            requestUrl.includes('/token/refresh');
          if (isLoginRequest) {
            // 如果是登录请求返回401，则表示登录失败，不是登录过期
            message.error('登录失败.');
          } else {
            // 其他请求返回401，表示登录已过期
            history.push(loginPath);
            NoLoginedHandler();
            message.info('登录已过期. 请重新登录.');
          }
        } else if (
          error.response.status === 403 &&
          error.response.data?.message === 'MFA_REQUIRED'
        ) {
          NoLoginedHandler();
          history.push(loginPath);
          message.warning('该操作需要多因素认证，请重新登录。');
        } else {
          message.error(error.response.data?.message || '请求失败');
        }
      } else {
        message.error('网络错误');
      }
    },
  },
  requestInterceptors: [
    async (url: string, options: any) => {
      console.log(`[Request Interceptor] Request URL: ${url}`);
      // 精确匹配：只有初次登录和刷新 Token 不需要带 Authorization
      const isInitialLogin = url === '/api/login';
      const isTokenRefresh = url.includes('/token/refresh');

      if (isInitialLogin || isTokenRefresh) {
        console.log(`[Request Interceptor] Skipping Auth header for: ${url}`);
        return { url, options };
      }

      let access = true;
      const accessToken = getLocalAccessToken();
      console.log(
        `[Request Interceptor] Local AccessToken found: ${
          accessToken ? 'Yes' : 'No'
        }`,
      );

      if (!isLogined()) {
        console.log('[Request Interceptor] Not logined, attempting refresh...');
        // refresh token 也要过期的 token 判断是否同一用户
        if (accessToken) {
          options.headers.Authorization = `Bearer ${accessToken}`;
          try {
            const response = await tokenRefresh(options);
            if (response.code === 200) {
              console.log('[Request Interceptor] Token refresh success');
              LoginHandler(parseAccessToken(response.data.accessToken));
            } else {
              access = false;
            }
          } catch (e) {
            console.error('[Request Interceptor] Token refresh failed', e);
            access = false;
          }
        } else {
          access = false;
        }
      }

      // 重新获取最新的 token
      const latestToken = getLocalAccessToken();
      if (latestToken) {
        options.headers.Authorization = `Bearer ${latestToken}`;
        console.log(
          `[Request Interceptor] Added Authorization header for: ${url}`,
        );
      }

      if (!access) {
        console.warn(
          `[Request Interceptor] Access denied for ${url}, redirecting...`,
        );
        return new Promise(() => {});
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
