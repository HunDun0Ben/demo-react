declare namespace API {
  type LoginRequest = {
    /** 密码 */
    password: string;
    /** 用户名 */
    username: string;
  };

  type LoginResponse = {
    /** JWT 访问令牌 */
    accessToken: string;
  };

  type RefreshTokenRequest = {
    /** JWT 刷新令牌 */
    refreshToken: string;
  };

  type RefreshTokenResponse = {
    /** 新的 JWT 访问令牌 */
    accessToken?: string;
  };

  type SwaggerResponse = {
    /** 业务码 */
    code?: number;
    /** 响应数据 */
    data?: any;
    /** 响应消息 */
    message?: string;
  };
}
