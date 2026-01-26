import { history } from '@umijs/max';

const LOGIN_PATH = '/login';
const TOKEN_KEY = 'accessToken';
const EXPIRE_KEY = 'accessToken.expire';

export enum AuthErrorType {
  TokenExpired = 'TOKEN_EXPIRED',
  TokenInvalid = 'TOKEN_INVALID',
  NetworkError = 'NETWORK_ERROR',
  ServerError = 'SERVER_ERROR',
}

export interface AuthResult<T> {
  success: boolean;
  data?: T;
  error?: {
    type: AuthErrorType;
    message: string;
  };
}

export function getLocalAccessToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function isAcccessTokenValid(exp: number): boolean {
  if (exp < Date.now()) {
    return false;
  }
  return true;
}

export function isLogined(): boolean {
  const accessToken = localStorage.getItem(TOKEN_KEY);
  const expStr = localStorage.getItem(EXPIRE_KEY);
  const exp = expStr ? parseInt(expStr, 10) : 0;
  return !!accessToken && isAcccessTokenValid(exp);
}

export function parseAccessToken(accessToken: string): API.TokenInfo {
  const payload = JSON.parse(atob(accessToken!.split('.')[1]));
  return {
    accessToken: accessToken,
    username: payload.username,
    roles: payload.roles,
    exp: payload.exp * 1000,
  };
}

export function LoginHandler(info: API.TokenInfo) {
  localStorage.setItem(TOKEN_KEY, info.accessToken);
  localStorage.setItem(EXPIRE_KEY, String(info.exp));
}

export function NoLoginedHandler() {
  history.push(LOGIN_PATH);
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(EXPIRE_KEY);
}

/**
 * Fetches user information from a trusted source.
 * In a real app, this would be an API call.
 */
export const fetchLocalUserInfo = async (): Promise<API.UserInfo | null> => {
  if (!isLogined()) {
    // 只返回null，不执行任何副作用
    return null;
  }
  try {
    const accessToken = localStorage.getItem(TOKEN_KEY);
    if (!accessToken) throw new Error('No token');
    const token = parseAccessToken(accessToken);
    return {
      username: token.username,
      roles: token.roles,
    };
  } catch (error) {
    console.error('Failed to parse token or fetch user info:', error);
    return null;
  }
};

/**
 * Fetches user information with detailed status.
 */
export const fetchLocalUserInfoWithStatus = async (): Promise<
  AuthResult<API.UserInfo>
> => {
  if (!isLogined()) {
    return {
      success: false,
      error: {
        type: AuthErrorType.TokenExpired,
        message: 'Token has expired',
      },
    };
  }

  try {
    const accessToken = localStorage.getItem(TOKEN_KEY);
    if (!accessToken) {
      return {
        success: false,
        error: {
          type: AuthErrorType.TokenInvalid,
          message: 'No token found',
        },
      };
    }

    const token = parseAccessToken(accessToken);
    return {
      success: true,
      data: {
        username: token.username,
        roles: token.roles,
      },
    };
  } catch (error) {
    return {
      success: false,
      error: {
        type: AuthErrorType.TokenInvalid,
        message: 'Invalid token',
      },
    };
  }
};

/**
 * Refreshes the access token if needed.
 */
export const refreshTokenIfNeeded = async (): Promise<boolean> => {
  const expStr = localStorage.getItem(EXPIRE_KEY);
  const exp = expStr ? parseInt(expStr, 10) : 0;

  // 如果令牌将在10分钟内过期，则尝试刷新
  if (exp < Date.now() + 10 * 60 * 1000) {
    try {
      // 实现令牌刷新逻辑
      // 注意：实际实现中需要调用后端API来刷新令牌
      // const response = await fetch('/api/refresh-token', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   credentials: 'include'
      // });
      //
      // if (response.ok) {
      //   const newTokenInfo = await response.json();
      //   LoginHandler(newTokenInfo);
      //   return true;
      // }
    } catch (error) {
      console.error('Failed to refresh token:', error);
    }
  }

  return false;
};
