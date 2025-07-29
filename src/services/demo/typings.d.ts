/* eslint-disable */
// 该文件由 OneAPI 自动生成，请勿手动修改！

declare namespace API {
  type ResStatusEnum = 200 | 400 | 401 | 403 | 404 | 500;

  interface loginReq {
    username: string;
    password: string;
  }

  interface AppRes<T = any> {
    code: ResStatusEnum;
    message: string;
    data: T;
  }

  interface LoginData {
    accessToken: string;
    refreshToken: string;
  }

  type LoginRes = AppRes<LoginData>;

  interface LotteryResult {
    upperHalf: Array<number>;
    lowerHalf: Array<number>;
  }

  interface PageInfo {
    /** 
1 */
    current?: number;
    pageSize?: number;
    total?: number;
    list?: Array<Record<string, any>>;
  }

  interface PageInfo_UserInfo_ {
    /** 
1 */
    current?: number;
    pageSize?: number;
    total?: number;
    list?: Array<UserInfo>;
  }

  interface Result {
    success?: boolean;
    errorMessage?: string;
    data?: Record<string, any>;
  }

  interface Result_PageInfo_UserInfo__ {
    success?: boolean;
    errorMessage?: string;
    data?: PageInfo_UserInfo_;
  }

  interface Result_UserInfo_ {
    success?: boolean;
    errorMessage?: string;
    data?: UserInfo;
  }

  interface Result_string_ {
    success?: boolean;
    errorMessage?: string;
    data?: string;
  }

  type UserGenderEnum = 'MALE' | 'FEMALE';

  interface UserInfo {
    id?: string;
    username?: string;
    /** nick */
    nickName?: string;
    /** email */
    email?: string;
    gender?: UserGenderEnum;
    token?: string;
    accessToken?: string;
    refreshToken?: string;
  }

  interface UserInfoVO {
    name?: string;
    /** nick */
    nickName?: string;
    /** email */
    email?: string;
  }

  type definitions_0 = null;

  interface Butterfly {
    id: string;
    chinese_name: string;
    english_name: string;
    latin_name: string;
    feature_description: string;
  }
}
