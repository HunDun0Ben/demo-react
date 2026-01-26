/* eslint-disable */
// 该文件由 OneAPI 自动生成，请勿手动修改！

declare namespace API {
  type ResStatusEnum = 200 | 400 | 401 | 403 | 404 | 500;

  type UserGenderEnum = 'MALE' | 'FEMALE';

  interface UserInfo {
    id?: string;
    username?: string;
    /** nick */
    nickName?: string;
    /** email */
    email?: string;
    gender?: UserGenderEnum;
    roles?: string[];
    exp?: number;
  }

  interface TokenInfo {
    accessToken: string;
    username: string;
    roles: string[];
    exp: number;
  }

  interface UserInfoVO {
    name?: string;
    /** nick */
    nickName?: string;
    /** email */
    email?: string;
  }

  interface Butterfly {
    id: string;
    chinese_name: string;
    english_name: string;
    latin_name: string;
    feature_description: string;
  }
}
