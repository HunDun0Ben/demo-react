/**
 * Fetches user information from a trusted source.
 * In a real app, this would be an API call.
 */
export const fetchLocalUserInfo = async (): Promise<API.UserInfo | null> => {
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) {
    return null;
  }
  try {
    const payload = JSON.parse(atob(accessToken.split('.')[1]));
    if (payload.exp * 1000 < Date.now()) {
      return null; // Token is expired
    }
    localStorage.setItem('tokenExp', String(payload.exp * 1000));
    return {
      username: payload.username,
      roles: payload.roles,
    };
  } catch (error) {
    console.error('Failed to parse token or fetch user info:', error);
    return null;
  }
};

export function isAcccessTokenValid(exp: number): boolean {
  if (exp < Date.now()) {
    return false;
  }
  return true;
}

export function isLogined(): boolean {
  const accessToken = localStorage.getItem('accessToken');
  const expStr = localStorage.getItem('tokenExp');
  const exp = expStr ? parseInt(expStr, 10) : 0;
  return !!accessToken && isAcccessTokenValid(exp);
}
