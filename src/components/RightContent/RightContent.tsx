import { logout } from '@/services/demo/login/LoginController';
import { LogoutOutlined } from '@ant-design/icons';
import { useModel } from '@umijs/max';
import { Menu, type MenuProps, message } from 'antd';
import React from 'react';
import { history } from 'umi';

// 用户菜单项
const menuItems: MenuProps['items'] = [
  {
    key: 'logout',
    icon: <LogoutOutlined />,
    label: '退出登录',
  },
];

// 处理点击事件
const UserDropdown: React.FC = () => {
  const { refresh } = useModel('@@initialState');

  const onMenuClick: MenuProps['onClick'] = async ({ key }) => {
    if (key === 'logout') {
      try {
        await logout(); // 调用后端注销接口
      } catch (error) {
        console.debug('注销失败（后端）:', error);
        // 即使失败也要继续执行本地清理
      }
      // 前端清理逻辑
      localStorage.clear();
      refresh();
      history.push('/login');
      message.success('用户已注销');
    }
  };

  return (
    <Menu
      className="menu"
      selectedKeys={[]}
      onClick={onMenuClick}
      items={menuItems}
    />
  );
};

export default UserDropdown;
