import { login } from '@/services/demo/login/LoginController';
import { Access, useAccess } from '@umijs/max';
import { Button, Form, Input, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { history, useModel } from 'umi';

const LoginPage: React.FC = () => {
  const access = useAccess();
  const { initialState, refresh } = useModel('@@initialState');
  const [loading, setLoading] = useState(false);

  // 添加登录状态检查
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && initialState?.currentUser) {
      message.success('您已登录');
      history.push('/home');
    }
  }, [initialState]);

  const handleLogin = async (values: API.loginReq) => {
    setLoading(true);
    // 模拟登录请求
    login(values)
      .then((response: API.LoginRes) => {
        console.debug('请求成功', response.status);
        if (response.status === 200) {
          // 1. 保存登录信息
          localStorage.setItem('token', 'fake-token');
          localStorage.setItem('username', values.username || '');
          // 2. 刷新全局状态
          return refresh();
        } else if (response.status === 401) {
          message.success('登录失败！');
        }
      })
      .then(() => {
        message.success('登录成功！');
        history.push('/home'); // 跳转到主页
      })
      .catch((error) => {
        console.error('请求失败', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div style={{ maxWidth: 300, margin: '100px auto' }}>
      <Form onFinish={handleLogin}>
        <Form.Item
          name="username"
          rules={[{ required: true, message: '请输入用户名！' }]}
        >
          <Input placeholder="用户名" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: '请输入密码！' }]}
        >
          <Input.Password placeholder="密码" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            登录
          </Button>
        </Form.Item>
        <Access accessible={access.canSeeAdmin}>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              登录
            </Button>
          </Form.Item>
        </Access>
      </Form>
    </div>
  );
};

export default LoginPage;
