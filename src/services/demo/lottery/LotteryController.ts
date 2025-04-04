import { request } from '@umijs/max';

export async function getLotteryNumbers(): Promise<
  API.BaseRes<API.LotteryResult>
> {
  return request('/api/lottery/bigLottery/random', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
