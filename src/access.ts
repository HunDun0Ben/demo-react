import { InitialStateType } from './app';

export default (initialState: InitialStateType) => {
  // 在这里按照初始化数据定义项目中的权限，统一管理
  // 参考文档 https://umijs.org/docs/max/access
  const { currentUser } = initialState || {};

  return {
    isAdmin: !!currentUser?.roles?.includes('admin'),
    canEdit: !!currentUser?.roles?.includes('user'),
    // 可定义更多权限函数或布尔值
  };
};
