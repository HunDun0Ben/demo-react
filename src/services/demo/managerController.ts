// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 初始化分类器 执行分类器的初始化或训练任务。这是一个管理接口。 GET /manage/initClassification */
export async function manageInitClassification(options?: {
  [key: string]: any;
}) {
  return request<API.AppRes & { data?: string }>(
    `/api/manage/initClassification`,
    {
      method: 'GET',
      ...(options || {}),
    },
  );
}

/** 初始化图像数据库 初始化图像数据库（待实现） GET /manage/initImgDB */
export async function manageInitImgDb(options?: { [key: string]: any }) {
  return request<API.AppRes>(`/api/manage/initImgDB`, {
    method: 'GET',
    ...(options || {}),
  });
}

/** 初始化昆虫信息 从服务器的预定路径读取 Excel 文件，并将蝴蝶物种信息初始化到数据库中。这是一个管理接口。 GET /manage/initInsect */
export async function manageInitInsect(options?: { [key: string]: any }) {
  return request<API.AppRes & { data?: string }>(`/api/manage/initInsect`, {
    method: 'GET',
    ...(options || {}),
  });
}
