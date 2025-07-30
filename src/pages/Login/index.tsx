import { login } from '@/services/demo/login/LoginController';
import { isLogined, LoginHandler, parseAccessToken } from '@/utils/auth';
import { Button, Form, Input, message } from 'antd';
import React, { useState } from 'react';
import { history, useModel } from 'umi';

const LoginPage: React.FC = () => {
  const { refresh } = useModel('@@initialState');
  const [loading, setLoading] = useState(false);

  if (isLogined()) {
    message.info('您已登录，已自动跳转到首页。');
    history.push('/home');
  }

  const handleLogin = async (req: API.LoginRequest) => {
    setLoading(true);
    try {
      const response = await login(req);
      LoginHandler(parseAccessToken(response.data.accessToken));
      message.success('登录成功');
      history.push('/home');
      await refresh();
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
