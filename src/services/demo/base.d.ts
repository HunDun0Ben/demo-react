declare namespace API {
  type ResStatusEnum = 200 | 400 | 401 | 403 | 404 | 500;
  type UserGenderEnum = 'MALE' | 'FEMALE';

  interface AppRes<T = any> {
    code: ResStatusEnum;
    message: string;
    data: T;
  }

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
}
