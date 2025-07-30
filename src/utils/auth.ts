import { history } from '@umijs/max';

const LOGIN_PATH = '/login';
const TOKEN_KEY = 'accessToken';
const EXPIRE_KEY = 'accessToken.expire';

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
    NoLoginedHandler();
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
