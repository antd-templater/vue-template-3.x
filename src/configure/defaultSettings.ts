import zhCN from 'ant-design-vue/es/locale/zh_CN'

/**
 * @themeColor 主题颜色
 * @themeWeak 色盲模式
 * @themeMode 主题风格
 * @contentWidth 内容区布局
 * @componentSize 组件尺寸
 * @layoutMode 整体布局方式
 * @domTitle 标题
 * @language 国际化
 * @multiTab 多标签页
 * @keepAlive 多标签缓存
 * @fixedHeader 固定 Header
 * @fixedSidebar 固定左侧菜单栏
 * @autoHideHeader 隐藏 Header
 */
export default {
  themeColor: {
    primaryColor: '#f5222d',
    warningColor: '#faad14',
    successColor: '#52c41a',
    errorColor: '#ff4d4f',
    infoColor: '#1890ff'
  },
  themeWeak: false,
  themeMode: 'light' as	ThemeMode,
  layoutMode: 'side' as LayoutMode,
  contentWidth: 'Fluid' as ContentWidth,
  componentSize: 'middle' as ComponentSize,
  domTitle: 'Antd Template',
  language: zhCN.locale,
  multiTab: true,
  keepAlive: true,
  fixedHeader: true,
  fixedSidebar: true,
  autoHideHeader: false
}

export type ThemeMode = 'light' | 'dark' | 'realDark'
export type LayoutMode = 'side' | 'top' | 'mix'
export type ContentWidth = 'Fixed' | 'Fluid'
export type ComponentSize = 'small' | 'middle' | 'large' | undefined
