declare namespace API {
  type Classification = {
    class?: string;
    family?: string;
    genus?: string;
    kingdom?: string;
    order?: string;
    phylum?: string;
    species?: string;
  };

  type Insect = {
    chinese_name?: string;
    classification?: Classification;
    distribution?: string;
    english_name?: string;
    feature_description?: string;
    id?: string;
    latin_name?: string;
    protection_level?: string;
    type?: string;
  };

  type LoginRequest = {
    /** 密码 */
    password: string;
    /** 用户名 */
    username: string;
  };

  type LoginResponse = {
    /** JWT 访问令牌 */
    accessToken?: string;
    /** MFA 是否必要 */
    mfa_required?: boolean;
    /** MFA 类型列表 */
    required_types?: string[];
  };

  type MFAVerifyRequest = {
    /** TOTP 验证码 */
    code: string;
  };

  type LotteryResult = {
    lowerHalf?: number[];
    upperHalf?: number[];
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

  type TOTPSetupRes = {
    /** QR码(base64编码) */
    qr_code?: string;
    /** 恢复码 */
    recovery_codes?: string[];
    /** TOTP 密钥 */
    secret?: string;
  };

  type TOTPVerifyReq = {
    /** TOTP验证码 */
    code: string;
  };

  type TOTPVerifyRes = {
    /** MFA是否已激活 */
    activated?: boolean;
    /** 响应消息 */
    message?: string;
  };

  type UserGetImgResultParams = {
    /** 预处理方式数组 */
    PreProWay?: number[];
    /** 特征类型 */
    Feature?: number;
    /** 分类器类型 */
    Classifier?: number;
    /** 图片ID */
    ImgID: string;
  };
}
