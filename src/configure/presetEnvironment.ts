/**
 * @AppProdEnv vite 内置属性 - 正式环境
 * @AppDevEnv vite 内置属性 - 开发环境
 * @AppRunEnv vite 自定义属性 - 部署环境: production | development | test
 * @AppApiBase vite 自定义属性 - 接口基础路径: api base url
 * @AppPageBase vite 自定义属性 - 页面资源基础路径: resource base
 * @AppRouterBase vite 自定义属性 - 路由器基础路径: router base
 * @AppRouterUseHash vite 自定义属性 - 路由器hash模式: createWebHashHistory
 * @AppHiddenSettings vite 自定义属性 - 隐藏应用设置中心: layout settings
 */
export const AppProdEnv = import.meta.env.PROD
export const AppDevEnv = import.meta.env.DEV
export const AppRunEnv = import.meta.env.VITE_APP_RUN_ENV || 'production'
export const AppApiBase = import.meta.env.VITE_APP_API_BASE || '/api'
export const AppPageBase = import.meta.env.VITE_APP_PAGE_BASE || '/'
export const AppRouterBase = import.meta.env.VITE_APP_ROUTER_BASE || '/'
export const AppRouterUseHash = import.meta.env.VITE_APP_ROUTER_HASH === 'true'
export const AppHiddenSettings = import.meta.env.VITE_APP_HIDE_SETTINGS === 'true'

export default {
  AppProdEnv,
  AppDevEnv,
  AppRunEnv,
  AppApiBase,
  AppPageBase,
  AppRouterBase,
  AppRouterUseHash,
  AppHiddenSettings
}
