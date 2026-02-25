import {
  userMfaSetupTotp,
  userMfaVerifyTotp,
} from '@/services/demo/userController';
import { CheckCircleOutlined, QrcodeOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import {
  Button,
  Card,
  Col,
  Divider,
  Input,
  Modal,
  Row,
  Space,
  Steps,
  message,
} from 'antd';
import React, { useState } from 'react';

const MfaSetupPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [qrCodeData, setQrCodeData] = useState('');
  const [secret, setSecret] = useState('');
  const [recoveryCodes, setRecoveryCodes] = useState<string[]>([]);
  const [verificationCode, setVerificationCode] = useState('');
  const [loading, setLoading] = useState(false);

  // 步骤标题
  const steps = [
    {
      title: '获取密钥',
      description: '获取您的MFA密钥和二维码',
    },
    {
      title: '扫描二维码',
      description: '使用认证器APP扫描二维码',
    },
    {
      title: '验证代码',
      description: '输入认证器生成的代码进行验证',
    },
    {
      title: '完成设置',
      description: 'MFA设置成功',
    },
  ];

  // 开始设置MFA
  const startMfaSetup = async () => {
    setLoading(true);
    try {
      const response = await userMfaSetupTotp();
      if (response.code === 200) {
        setQrCodeData(response.data?.qr_code || '');
        setSecret(response.data?.secret || '');
        setRecoveryCodes(response.data?.recovery_codes || []);
        setCurrentStep(1);
        message.success('MFA设置信息获取成功');
      } else {
        message.error(response.message || '获取MFA设置信息失败');
      }
    } catch (error) {
      console.error('获取MFA设置信息失败:', error);
      message.error('获取MFA设置信息失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  // 验证MFA代码
  const verifyMfaCode = async () => {
    if (!verificationCode || verificationCode.length !== 6) {
      message.warning('请输入6位验证码');
      return;
    }

    setLoading(true);
    try {
      const response = await userMfaVerifyTotp({ code: verificationCode });
      if (response.data.activated) {
        setCurrentStep(3);
        message.success('MFA验证成功，双因素认证已启用');
      } else {
        message.error(response.message || '验证码验证失败，请重试');
      }
    } catch (error) {
      console.error('验证MFA代码失败:', error);
      message.error('验证失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  // 显示恢复码的模态框
  const showRecoveryCodes = () => {
    Modal.info({
      title: '恢复码',
      content: (
        <div>
          <p>请妥善保存以下恢复码，以防您无法访问认证器应用：</p>
          <div style={{ marginTop: 16 }}>
            {recoveryCodes.map((code, index) => (
              <div
                key={index}
                style={{ marginBottom: 8, fontFamily: 'monospace' }}
              >
                {code}
              </div>
            ))}
          </div>
          <p style={{ marginTop: 16, color: '#ff4d4f' }}>
            注意：每个恢复码只能使用一次，请安全保存。
          </p>
        </div>
      ),
      okText: '确定',
      width: 500,
    });
  };

  return (
    <PageContainer>
      <Card>
        <Steps
          current={currentStep}
          items={steps.map((step) => ({
            title: step.title,
            description: step.description,
          }))}
        />

        <Divider />

        <div style={{ marginTop: 24 }}>
          {currentStep === 0 && (
            <div style={{ textAlign: 'center' }}>
              <Space direction="vertical">
                <h3>设置双因素认证 (MFA)</h3>
                <p>增强您的账户安全性，启用双因素认证</p>
                <Button
                  type="primary"
                  size="large"
                  onClick={startMfaSetup}
                  loading={loading}
                >
                  开始设置
                </Button>
              </Space>
            </div>
          )}

          {currentStep === 1 && (
            <Row justify="center">
              <Col xs={24} sm={18} md={12}>
                <Space
                  direction="vertical"
                  align="center"
                  style={{ width: '100%' }}
                >
                  <h3>扫描二维码</h3>
                  <p>
                    使用Google Authenticator或其他TOTP兼容的应用扫描下方二维码
                  </p>

                  <div
                    style={{
                      padding: '20px',
                      backgroundColor: '#fff',
                      border: '1px solid #ddd',
                      borderRadius: 8,
                    }}
                  >
                    {qrCodeData ? (
                      <img
                        src={`${qrCodeData}`}
                        alt="MFA QR Code"
                        style={{ maxWidth: '200px', height: 'auto' }}
                      />
                    ) : (
                      <div style={{ padding: '40px', color: '#ccc' }}>
                        <QrcodeOutlined style={{ fontSize: 48 }} />
                        <p>二维码加载中...</p>
                      </div>
                    )}
                  </div>

                  <div
                    style={{ textAlign: 'left', width: '100%', marginTop: 20 }}
                  >
                    <p>
                      <strong>备用密钥:</strong> {secret}
                    </p>
                    <p>
                      如果无法扫描二维码，请手动输入此密钥到您的认证器应用中
                    </p>
                  </div>

                  <Space>
                    <Button onClick={() => setCurrentStep(0)}>上一步</Button>
                    <Button type="primary" onClick={() => setCurrentStep(2)}>
                      下一步
                    </Button>
                  </Space>
                </Space>
              </Col>
            </Row>
          )}

          {currentStep === 2 && (
            <Row justify="center">
              <Col xs={24} sm={18} md={12}>
                <Space direction="vertical" style={{ width: '100%' }}>
                  <h3>验证代码</h3>
                  <p>在您的认证器应用中找到6位验证码并输入下方</p>

                  <Input
                    size="large"
                    placeholder="输入6位验证码"
                    maxLength={6}
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    style={{ textAlign: 'center', fontSize: '18px' }}
                  />

                  <div style={{ marginTop: 20 }}>
                    <Button
                      type="primary"
                      size="large"
                      onClick={verifyMfaCode}
                      loading={loading}
                      block
                    >
                      验证并启用MFA
                    </Button>
                  </div>

                  <div style={{ marginTop: 16, textAlign: 'center' }}>
                    <a onClick={showRecoveryCodes}>查看恢复码</a>
                  </div>

                  <div style={{ marginTop: 16 }}>
                    <Button onClick={() => setCurrentStep(1)}>上一步</Button>
                  </div>
                </Space>
              </Col>
            </Row>
          )}

          {currentStep === 3 && (
            <div style={{ textAlign: 'center' }}>
              <Space direction="vertical">
                <CheckCircleOutlined
                  style={{ fontSize: 48, color: '#52c41a' }}
                />
                <h3>MFA设置成功！</h3>
                <p>您的双因素认证已成功启用</p>

                <div style={{ marginTop: 24 }}>
                  <Button type="primary" onClick={showRecoveryCodes}>
                    查看恢复码
                  </Button>
                </div>

                <div style={{ marginTop: 16 }}>
                  <p>下次登录时，您需要提供认证器应用生成的验证码</p>
                </div>
              </Space>
            </div>
          )}
        </div>
      </Card>
    </PageContainer>
  );
};

export default MfaSetupPage;
