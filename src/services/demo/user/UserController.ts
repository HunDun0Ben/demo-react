// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 上传图片 上传图片文件到服务器 POST /user/uploadImg */
export async function userUploadImg(
  params: {},
  file?: File,
  options?: { [key: string]: any },
) {
  const formData = new FormData();

  if (file) {
    console.log('add file ', file.name);
    formData.append('file', file);
  }

  return request<API.AppRes<API.UploadImgRes>>('/api/user/uploadImg', {
    method: 'POST',
    data: formData,
    // 不指定 requestType 或者设置为 'formData'
    requestType: 'formData',
    ...(options || {}),
  });
}
