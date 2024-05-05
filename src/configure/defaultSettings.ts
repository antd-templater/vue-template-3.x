import zhCN from 'ant-design-vue/es/locale/zh_CN'

/**
 * @themeColor 主题颜色
 * @themeWeak 弱色模式
 * @themeMode 主题风格
 * @layoutMode 整体布局方式
 * @iconPrefix 图标字体库 - 前缀
 * @iconfontUrl 图标字体库 - 资源
 * @contentWidth 内容区布局
 * @componentSize 组件尺寸
 * @domTitle 标题
 * @language 国际化
 * @multiTab 多标签页
 * @keepAlive 多标签缓存
 * @fixedHeader 固定顶部栏导航
 * @fixedSidebar 固定左侧菜单栏
 * @fixedHeaderTab 固定导航栏页签
 * @hideMixHeaderTab 隐藏混合导航页签
 */
export default {
  themeColor: {
    primaryColor: '#f5222d',
    warningColor: '#faad14',
    successColor: '#52c41a',
    errorColor: '#ff4d4f',
    infoColor: '#1890ff',
  },
  themeWeak: false,
  themeMode: 'light' as ThemeMode,
  layoutMode: 'side' as LayoutMode,
  iconPrefix: 'icon-',
  iconfontUrl: '',
  contentWidth: 'Fluid' as ContentWidth,
  componentSize: 'middle' as ComponentSize,
  domTitle: 'Antd Template',
  language: zhCN.locale,
  multiTab: true,
  keepAlive: true,
  fixedHeader: true,
  fixedSidebar: true,
  fixedHeaderTab: true,
  hideMixHeaderTab: true,
}

export type ThemeMode = 'light' | 'dark' | 'realDark'
export type LayoutMode = 'side' | 'top' | 'mix'
export type ContentWidth = 'Fixed' | 'Fluid'
export type ComponentSize = 'small' | 'middle' | 'large' | undefined
