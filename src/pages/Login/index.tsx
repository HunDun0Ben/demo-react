import { login } from '@/services/demo/login/LoginController';
import { Button, Form, Input, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { history, useModel } from 'umi';

const LoginPage: React.FC = () => {
  const { initialState, refresh } = useModel('@@initialState');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialState?.currentUser) {
      history.push('/home');
      message.info('您已登录，已自动跳转到首页。');
    }
  }, [initialState]);

  const handleLogin = async (req: API.loginReq) => {
    setLoading(true);
    try {
      const response = await login(req);

      if (response.code === 200) {
        // 1. 保存登录信息
        localStorage.setItem('accessToken', response.data.accessToken);
        localStorage.setItem('refreshToken', response.data.refreshToken);
        localStorage.setItem('username', req.username || '');
        // 2. 刷新全局状态，并等待其完成
        await refresh();
        history.push('/home');
        message.success('登录成功');
      } else {
        // 登录失败，显示错误信息
        message.error(response.message || '登录失败，请检查您的用户名和密码！');
      }
    } catch (error) {
      // 网络请求失败等异常情况
      console.error('登录请求出错:', error);
      message.error('登录时发生错误，请稍后重试。');
    } finally {
      setLoading(false);
    }
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
      </Form>
    </div>
  );
};

export default LoginPage;
