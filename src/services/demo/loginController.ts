// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 用户登录 用户使用用户名和密码进行登录，成功后返回 JWT Token。 POST /login */
export async function login(
  body: API.LoginRequest,
  options?: { [key: string]: any },
) {
  return request<API.AppRes & { data?: API.LoginResponse }>(`/api/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 用户登出 用户登出，将当前 Access Token 加入黑名单使其失效 POST /logout */
export async function logout(options?: { [key: string]: any }) {
  return request<API.AppRes>(`/api/logout`, {
    method: 'POST',
    ...(options || {}),
  });
}

/** 刷新 Access Token 使用 Refresh Token 获取一个新的 Access Token GET /token/refresh */
export async function tokenRefresh(options?: { [key: string]: any }) {
  return request<API.AppRes & { data?: API.RefreshTokenResponse }>(
    `/api/token/refresh`,
    {
      method: 'GET',
      ...(options || {}),
    },
  );
}

/** MFA 验证 POST /login/mfa-verify */
export async function verifyMFA(
  body: API.MFAVerifyRequest,
  options?: { [key: string]: any },
) {
  return request<API.AppRes & { data?: API.LoginResponse }>(
    `/api/login/mfa-verify`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
      ...(options || {}),
    },
  );
}
