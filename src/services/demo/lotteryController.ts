// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 生成大乐透随机号码 生成大乐透随机号码，分为前区和后区两部分 GET /lottery/bigLottery/random */
export async function lotteryBigLotteryRandom(options?: {
  [key: string]: any;
}) {
  return request<API.AppRes & { data?: API.LotteryResult }>(
    `/api/lottery/bigLottery/random`,
    {
      method: 'GET',
      ...(options || {}),
    },
  );
}
