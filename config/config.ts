import { defineConfig } from '@umijs/max';
import routes from './routes/routes';

export default defineConfig({
  mock: false,
  proxy: {
    '/api': {
      target: 'http://localhost:33456/demo', // 目标后端接口域名
      changeOrigin: true, // 用于修改请求头中的 `Origin` 字段
      pathRewrite: { '^/api': '' }, // 可选: 重写路径，将 `/api` 去除
    },
  },
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: '@umijs/max',
    locale: false,
  },
  routes: routes,
  npmClient: 'npm',
});
