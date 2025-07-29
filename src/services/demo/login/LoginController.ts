/* eslint-disable */
// 该文件由 OneAPI 自动生成，请勿手动修改！
import { request } from '@umijs/max';

export async function login(
  body: API.loginReq,
  options?: { [key: string]: any },
) {
  return request<API.LoginRes>('/api/login', {
    method: 'GET',
    params: body,
    ...(options || {}),
  });
}

export async function logout(options?: { [key: string]: any }) {
  return request<API.AppRes<any>>('/api/logout', {
    method: 'POST',
    ...(options || {}),
  });
}
