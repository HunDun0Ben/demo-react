import { verifyMFA } from '@/services/demo/loginController';
import { Form, Input, Modal, message } from 'antd';
import React, { useState } from 'react';

interface MFAModalProps {
  visible: boolean;
  onCancel: () => void;
  onSuccess: (accessToken: string) => void;
}

const MFAModal: React.FC<MFAModalProps> = ({
  visible,
  onCancel,
  onSuccess,
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: { code: string }) => {
    setLoading(true);
    try {
      const response = await verifyMFA(values);
      if (response.code === 200 && response.data?.accessToken) {
        message.success('验证成功');
        onSuccess(response.data.accessToken);
        form.resetFields();
      } else {
        message.error(response.message || '验证失败');
      }
    } catch (error: any) {
      // Error is handled by errorHandler, but we need to stop loading
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="多因素认证 (MFA)"
      open={visible}
      onCancel={onCancel}
      onOk={() => form.submit()}
      confirmLoading={loading}
      destroyOnClose
    >
      <p>请输入 TOTP 验证码以继续登录。</p>
      <Form form={form} onFinish={handleSubmit} layout="vertical">
        <Form.Item
          name="code"
          label="验证码"
          rules={[
            { required: true, message: '请输入 6 位验证码' },
            { len: 6, message: '请输入 6 位数字' },
          ]}
        >
          <Input placeholder="000000" maxLength={6} autoFocus />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default MFAModal;
