// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 获取蝴蝶种类信息 获取所有蝴蝶种类的详细信息列表 GET /user/butterfly_type_info */
export async function userButterflyTypeInfo(options?: { [key: string]: any }) {
  return request<API.AppRes & { data?: API.Insect[] }>(
    `/api/user/butterfly_type_info`,
    {
      method: 'GET',
      ...(options || {}),
    },
  );
}

/** 获取图片处理结果 根据图片ID获取图片处理的结果 GET /user/getImgResult */
export async function userGetImgResult(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.UserGetImgResultParams,
  options?: { [key: string]: any },
) {
  return request<API.AppRes & { data?: Record<string, any> }>(
    `/api/user/getImgResult`,
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 获取昆虫信息 获取昆虫的详细信息（待实现） GET /user/insect */
export async function userInsect(options?: { [key: string]: any }) {
  return request<API.AppRes>(`/api/user/insect`, {
    method: 'GET',
    ...(options || {}),
  });
}

/** 设置TOTP双因素认证 为用户生成TOTP密钥和恢复码，返回包含二维码的配置信息 GET /user/mfa/setup/totp */
export async function userMfaSetupTotp(options?: { [key: string]: any }) {
  return request<API.AppRes & { data?: API.TOTPSetupRes }>(
    `/api/user/mfa/setup/totp`,
    {
      method: 'GET',
      ...(options || {}),
    },
  );
}

/** 验证TOTP 验证用户提供的TOTP码，验证成功后激活MFA POST /user/mfa/verify/totp */
export async function userMfaVerifyTotp(
  body: API.TOTPVerifyReq,
  options?: { [key: string]: any },
) {
  return request<API.TOTPVerifyRes>(`/api/user/mfa/verify/totp`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 上传图片 上传图片文件到服务器 POST /user/uploadImg */
export async function userUploadImg(
  body: {},
  file?: File,
  options?: { [key: string]: any },
) {
  const formData = new FormData();

  if (file) {
    formData.append('file', file);
  }

  Object.keys(body).forEach((ele) => {
    const item = (body as any)[ele];

    if (item !== undefined && item !== null) {
      if (typeof item === 'object' && !(item instanceof File)) {
        if (item instanceof Array) {
          item.forEach((f) => formData.append(ele, f || ''));
        } else {
          formData.append(ele, JSON.stringify(item));
        }
      } else {
        formData.append(ele, item);
      }
    }
  });

  return request<API.AppRes & { data?: Record<string, any> }>(
    `/api/user/uploadImg`,
    {
      method: 'POST',
      data: formData,
      requestType: 'form',
      ...(options || {}),
    },
  );
}
