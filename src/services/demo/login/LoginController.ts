/* eslint-disable */
// 该文件由 OneAPI 自动生成，请勿手动修改！
import { request } from '@umijs/max';

export async function login(
  body: API.loginReq,
  options?: { [key: string]: any },
) {
  return request<API.LoginRes>('/api/login', {
    method: 'POST',
    // 使用 `data` 来传递表单数据
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: 'username=name1&password=name1',
    ...(options || {}),
  });
}
