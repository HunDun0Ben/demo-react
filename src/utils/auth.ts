/**
 * Fetches user information from a trusted source.
 * In a real app, this would be an API call.
 */
export const fetchLocalUserInfo = async (): Promise<API.UserInfo | null> => {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  const username = localStorage.getItem('username');
  if (!accessToken || !refreshToken || !username) {
    return null;
  }
  try {
    const payload = JSON.parse(atob(accessToken.split('.')[1]));
    if (payload.exp * 1000 < Date.now()) {
      return null; // Token is expired
    }
    localStorage.setItem('tokenExp', String(payload.exp * 1000));
    return {
      username,
      accessToken,
      refreshToken,
    };
  } catch (error) {
    console.error('Failed to parse token or fetch user info:', error);
    return null;
  }
};
