import { request } from '@umijs/max';

export async function getLotteryNumbers(): Promise<
  API.AppRes<API.LotteryResult>
> {
  return request('/api/lottery/bigLottery/random', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
