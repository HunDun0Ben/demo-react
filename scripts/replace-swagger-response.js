#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// 获取项目根目录
const projectRoot = path.resolve(__dirname, '..');
const servicesDir = path.join(projectRoot, 'src', 'services', 'demo');

console.log('开始替换 API.SwaggerResponse 为 API.AppRes...');

// 读取 src/services/demo 目录中的所有文件
const files = fs.readdirSync(servicesDir);

files.forEach((file) => {
  // 只处理 .ts 文件
  if (file.endsWith('.ts')) {
    const filePath = path.join(servicesDir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // 检查是否包含 API.SwaggerResponse
    if (content.includes('API.SwaggerResponse')) {
      // 替换 API.SwaggerResponse 为 API.AppRes
      const updatedContent = content.replace(
        /API\.SwaggerResponse/g,
        'API.AppRes',
      );

      if (content !== updatedContent) {
        fs.writeFileSync(filePath, updatedContent, 'utf8');
        console.log(`✓ 已更新: ${filePath}`);
      }
    }
  }
});

console.log('替换完成！');
