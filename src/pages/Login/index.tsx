import { login } from '@/services/demo/loginController';
import { isLogined, LoginHandler, parseAccessToken } from '@/utils/auth';
import { Button, Form, Input, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { history, useModel } from 'umi';
import MFAModal from './components/MFAModal';

const LoginPage: React.FC = () => {
  const { refresh } = useModel('@@initialState');
  const [loading, setLoading] = useState(false);
  const [isMFAModalVisible, setIsMFAModalVisible] = useState(false);

  useEffect(() => {
    if (isLogined()) {
      message.info('您已登录，已自动跳转到首页。');
      history.push('/home');
    }
  }, []);

  const handleLogin = async (req: API.LoginRequest) => {
    setLoading(true);
    try {
      const response = await login(req);
      const { accessToken, mfa_required } = response.data || {};

      if (mfa_required) {
        // 保存受限 Token
        if (accessToken) {
          LoginHandler(parseAccessToken(accessToken));
          setIsMFAModalVisible(true);
        } else {
          message.error('MFA 认证需要访问令牌，但未获取到。');
        }
        setIsMFAModalVisible(true);
      } else {
        LoginHandler(parseAccessToken(accessToken!));
        await refresh();
        message.success('登录成功');
        history.push('/home');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleMFASuccess = async (fullToken: string) => {
    setIsMFAModalVisible(false);
    LoginHandler(parseAccessToken(fullToken));
    await refresh();
    await refresh();
    history.push('/home');
    history.push('/home');
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
      <MFAModal
        visible={isMFAModalVisible}
        onCancel={() => setIsMFAModalVisible(false)}
        onSuccess={handleMFASuccess}
      />
    </div>
  );
};

export default LoginPage;
