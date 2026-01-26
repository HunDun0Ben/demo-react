// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 获取产品类型信息 获取预处理方式和特征类型等产品配置信息 GET /test/getAllProType */
export async function testGetAllProType(options?: { [key: string]: any }) {
  return request<API.AppRes & { data?: Record<string, any> }>(
    `/api/test/getAllProType`,
    {
      method: 'GET',
      ...(options || {}),
    },
  );
}
