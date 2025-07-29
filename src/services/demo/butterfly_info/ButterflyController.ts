import { request } from '@umijs/max';

export async function getButterflies() {
  return request<API.AppRes<API.Butterfly[]>>('/api/user/butterfly_type_info', {
    method: 'GET',
  });
}
