import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import { AppRouterBase, AppRouterUseHash } from '@/configure/presetEnvironment'
import { baseRoutes } from '@/router.constant'
import useAppStore from '@/store/app'

const computeRoutes: any = baseRoutes
const computeHistory = AppRouterUseHash
  ? createWebHashHistory(AppRouterBase)
  : createWebHistory(AppRouterBase)

export default createRouter({
  routes: computeRoutes,
  history: computeHistory,
  scrollBehavior: (to, _, position) => {
    const app = useAppStore()
    const multiTab = app.multiTab
    const keepAlive = app.keepAlive
    const isAllowCache = to.meta.allowCache !== false

    return !multiTab || !keepAlive || !isAllowCache || !position
      ? { top: 0, left: 0 }
      : position
  }
})
