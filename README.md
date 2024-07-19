**Antd-Template-Vue** 是一个基于 TypeScript + Vue3.x + Pinia + Ant-Design-Vue4.x + Vite 等技术栈，为开发中大型后台管理系统而提供开箱即用的解决方案，支持动态主题(Design Token)、动态菜单配置、路由权限校验、数据持久化储存，同时也提供完备的 TypeScript + ESLint + Volar 格式化和规范。[**查看文档**](https://antd-templater.github.io/docs/vue3.x/)

- 轻量化: 仅预设基础访问页, 没有冗余 Demo 页
- 多主题: 支持亮色风格、暗色风格、暗黑风格等
- 多布局: 侧边菜单、顶部菜单、混合菜单等导航
- 标签栏: 支持面包屑，支持多页签及其数据缓存
- 现数据: 由 `msw` + 预设的 mock data 提供

<br/>
<br/>

## 技术栈

本项目需要一定前端基础知识，以便能处理一些常见的问题。建议在开发前先了解以下内容，这会非常有帮助:

- [Vite 文档](https://cn.vitejs.dev/)
- [Vue3 API](https://cn.vuejs.org/api/)
- [Vue3 文档](https://cn.vuejs.org/)
- [Pinia 文档](https://pinia.vuejs.org/)
- [ESLint 文档](https://eslint.org/docs/)
- [Vitest 文档](https://cn.vitest.dev/guide/)
- [Cypress 文档](https://docs.cypress.io/)
- [TypeScript 文档](https://www.typescriptlang.org/zh/docs/)
- [Ant Design Vue 文档](https://antdv.com/docs/vue/introduce-cn)
- [Vue2 迁移到 Vue3 指南](https://v3-migration.vuejs.org/zh/)


<br/>
<br/>

## 开发环境

- Pnpm 版本: `>=7`
- Node 版本: `^18.18.0 || ^20.9.0 || >=21.1.0`

<br/>
<br/>

## 如何使用

### 下载源码

```bash
# Download
git clone https://github.com/antd-templater/vue-template-3.x.git Antd-Template-Vue
```

### 安装依赖

```bash
# Enter project
cd Antd-Template-Vue

# Install denpendencies
pnpm install
```

### 本地启动
```bash
# Start develop server
pnpm dev
```

### 本地构建和预览
```bash
# Run build create dist
pnpm build

# Start server and preview
pnpm preview
```

<br/>
<br/>

## [高阶组件](https://github.com/antd-templater/library-3.x)

| 组件 | 名称 | 描述 | Demo 演示 |
| :--- | :--- | --- | :--- |
| SIcon | 图标组件 | 支持 Props 中 type 字段，动态渲染 @ant-design/icons-vue 中图标，也支持 iconfont 配置 | [详情 ↗](https://antd-templater.github.io/docs/vue3.x/library/icon) |
| SIconSelect | 图标选择器 | 图标 Selection 下拉框，默认使用 @ant-design/icons-vue 中图标作为选项，也支持自定义选项 | [详情 ↗](https://antd-templater.github.io/docs/vue3.x/library/icon_select) |
| SEditCell | 单元格编辑框 | 表格 Cell 编辑框，支持 date-picker、input、select、textarea、tree-selec、s-icon-select 等组件适配    | [详情 ↗](https://antd-templater.github.io/docs/vue3.x/library/edit_cell) |
| SEllipsis | 文字省略提示 | 基于 ATooltip 的封装，支持实时计算内容是否超出父元素边界，是否需要文字省略和 Tooltip 提示 | [详情 ↗](https://antd-templater.github.io/docs/vue3.x/library/ellipsis) |
| STable | 表格组件 | 不是 ATable 的封装，支持 列拉伸/拖拽/属性配置，单元格合并/卡槽定义，Checkbox/Radio、内置分页等功能 | [详情 ↗](https://antd-templater.github.io/docs/vue3.x/library/table) |
| SForm | 表单组件 | 支持 Groups 配置渲染表单内容，也支持卡槽自定义组件。(Group: ARate、ARadio、AInput、ASwitch ...) | [详情 ↗](https://antd-templater.github.io/docs/vue3.x/library/form) |
| STree | 树形组件 | 借助 ATree 的 checkStrictly="true" 特性，重新实现了 `勾选/选中/展开/异步加载` 等逻辑，并扩展了其 API | [详情 ↗](https://antd-templater.github.io/docs/vue3.x/library/tree) |