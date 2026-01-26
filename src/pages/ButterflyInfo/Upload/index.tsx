import { userUploadImg } from '@/services/demo/userController';
import { InboxOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { Button, Card, Upload, message } from 'antd';
import type { UploadFile } from 'antd/es/upload';
import React, { useState } from 'react';

const UploadPage: React.FC = () => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [uploading, setUploading] = useState(false);

  const props = {
    onRemove: (file: UploadFile) => {
      setFileList((prev) => prev.filter((item) => item.uid !== file.uid));
    },
    beforeUpload: (file: UploadFile) => {
      setFileList((prev) => [...prev, file]);
      // 阻止自动上传
      return false;
    },
    fileList,
    multiple: true, // 允许一次选择多个文件
  };

  const handleUpload = async () => {
    setUploading(true);
    try {
      // TODO: 修复文件上传时的错误处理
      // - 目标：单个文件上传失败不影响其他文件
      // - 可能方案：逐文件上传并独立记录状态，统一在 UI 显示上传结果

      await Promise.all(
        // 针对每个文件单独去做上传操作.
        fileList.map((file) => userUploadImg({}, file as unknown as File)),
      );
      message.success('所有文件上传成功');
      setFileList([]);
    } catch (error) {
      message.error('文件上传失败，请重试');
    } finally {
      setUploading(false);
    }
  };

  return (
    <PageContainer>
      <Card>
        <Upload.Dragger {...props}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">点击或拖拽文件到此区域上传</p>
          <p className="ant-upload-hint">支持单个或批量上传</p>
        </Upload.Dragger>
        <Button
          type="primary"
          onClick={handleUpload}
          disabled={fileList.length === 0}
          loading={uploading}
          style={{ marginTop: 16 }}
        >
          {uploading ? '上传中...' : '开始上传'}
        </Button>
      </Card>
    </PageContainer>
  );
};

export default UploadPage;
