const bool = (bool: any) => {
  return (
    bool === 'TRUE' ||
    bool === 'True' ||
    bool === 'true' ||
    bool === true
  )
}
const format = (base: string) => {
  const http = /^https?:\/\//i
  const prefix = /^\/*/
  const suffix = /\/+$/

  if (!http.test(base)) {
    base = base.replace(suffix, '')
    base = base.replace(prefix, '/')
  }

  if (http.test(base)) {
    base = base.replace(suffix, '')
  }

  return base
}

/**
 * @AppDevEnv vite 内置属性 --- 开发环境
 * @AppProdEnv vite 内置属性 --- 正式环境
 * @AppTestEnv vite 自定义属性 --- 测试环境
 * @AppApiBase vite 自定义属性 --- 接口基础路径: api base
 * @AppPageBase vite 自定义属性 --- 页面资源基础路径: page base
 * @AppRouterBase vite 自定义属性 --- 路由器基础路径: router base
 * @AppRouterUseHash vite 自定义属性 --- 路由 hash 模式: WebHashHistory
 * @AppHiddenSettings vite 自定义属性 --- 隐藏应用设置中心: hidden layout settings
 */
export const AppDevEnv = bool(import.meta.env.DEV)
export const AppProdEnv = bool(import.meta.env.PROD)
export const AppTestEnv = bool(import.meta.env.VITE_APP_TEST_ENV || '')
export const AppApiBase = format(import.meta.env.VITE_APP_API_BASE || '')
export const AppPageBase = format(import.meta.env.VITE_APP_PAGE_BASE || '')
export const AppRouterBase = format(import.meta.env.VITE_APP_ROUTER_BASE || '')
export const AppRouterUseHash = bool(import.meta.env.VITE_APP_ROUTER_HASH || '')
export const AppHiddenSettings = bool(import.meta.env.VITE_APP_HIDDEN_SETTINGS || '')

export default {
  AppDevEnv,
  AppProdEnv,
  AppTestEnv,
  AppApiBase,
  AppPageBase,
  AppRouterBase,
  AppRouterUseHash,
  AppHiddenSettings
}
