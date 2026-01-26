# 项目概述

这是一个基于 UmiJS Max 框架的前端 React 应用程序，使用 TypeScript 编写。该项目是一个演示应用程序，包含了多个功能模块，如用户管理、蝴蝶信息展示、抽奖系统等。

## 技术栈

- **框架**: UmiJS Max v4.4.11
- **语言**: TypeScript
- **UI 组件库**: Ant Design v5.4.0 和 Ant Design Pro Components
- **图标**: Ant Design Icons
- **构建工具**: 基于 UmiJS 的构建系统

## 项目结构

```
src/
├── assets/           # 静态资源
├── components/       # 公共组件
├── constants/        # 常量定义
├── models/           # 数据模型和请求配置
├── pages/            # 页面组件
│   ├── Access/       # 权限相关页面
│   ├── ButterflyInfo/ # 蝴蝶信息页面
│   ├── Home/         # 首页
│   ├── Login/        # 登录页面
│   ├── Lottery/      # 抽奖页面
│   └── Table/        # 表格页面
├── services/         # API 服务
│   └── demo/         # 示例服务
├── utils/            # 工具函数
├── access.ts         # 访问控制
└── app.tsx           # 应用入口配置
```

## 主要功能

1. **身份验证**: 包含登录、令牌管理和自动刷新功能
2. **路由管理**: 基于 UmiJS 的约定式路由
3. **布局**: 使用 Ant Design Pro Components 提供的标准布局
4. **API 请求**: 统一的请求拦截器和响应处理
5. **抽奖功能**: 包含前后区号码的随机生成和显示

## 构建与运行

### 开发环境

```bash
npm run dev
```

### 生产构建

```bash
npm run build
```

### 其他命令

- `npm run start` - 启动开发服务器（同 `dev`）
- `npm run setup` - 初始化项目设置
- `npm run format` - 格式化代码

## 开发规范

- **代码格式化**: 使用 Prettier 自动格式化，配置在 `.prettierrc`
- **代码检查**: 使用 ESLint，配置在 `.eslintrc.js`
- **样式检查**: 使用 StyleLint，配置在 `.stylelintrc.js`
- **Git 钩子**: 使用 Husky 和 lint-staged 确保提交质量

## API 接口

项目通过 `src/services/demo` 目录下的控制器与后端 API 进行交互，包括：

- 用户认证相关接口
- 蝴蝶信息管理接口
- 抽奖功能接口
- 用户管理接口

## 状态管理

使用 UmiJS 的 Model 功能进行全局状态管理，并通过 `getInitialState` 函数初始化应用状态。

## 特殊功能

- **防抖处理**: 在 Lottery 页面中使用了防抖技术防止重复点击
- **排序功能**: Lottery 页面中的号码会自动按从小到大排序
- **权限控制**: 通过 access.ts 实现页面访问权限控制
