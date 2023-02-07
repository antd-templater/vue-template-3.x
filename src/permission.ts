import router from '@/router'
import useAppStore from '@/store/app'
import useUserStore from '@/store/user'
import useRouterStore from '@/store/router'
import routerComponents from '@/router.dynamic'
import Notification from 'ant-design-vue/es/notification'
import NProgress from 'nprogress'

/**
 * 进度配置
 */
NProgress.configure({ showSpinner: false })

/**
 * 路由配置
 */
const indexRoutePath = '/index'
const loginRoutePath = '/login/Login'
const whiteRouteList = ['/login/Login']

/**
 * 路由处理
 */
router.beforeEach(async(to, from, next) => {
  NProgress.start()

  const userStore = useUserStore()
  const routerStore = useRouterStore()

  const token = userStore.token
  const userRole = userStore.userRole

  if (token) {
    if (to.path === loginRoutePath) {
      next({ path: indexRoutePath })
      return
    }

    if (!userRole.permissions || userRole.permissions.length === 0) {
      try {
        await userStore.getUserInfo({})
        await routerStore.generateRouter({}, routerComponents)

        const dynamicRoutes = toRaw(routerStore.dynamicRoutes)
        const visitRedirect = from.query.redirect || to.path
        const pathRedirect = typeof visitRedirect === 'string'
          ? decodeURIComponent(visitRedirect)
          : ''

        for (const route of dynamicRoutes) {
          router.addRoute(route as any)
        }

        to.path === pathRedirect
          ? next({ ...to, replace: true })
          : next({ path: pathRedirect })
      } catch {
        await new Promise(resolve => {
          Notification.error({
            duration: 0.8,
            message: '系统通知',
            description: '获取用户信息失败，请重新登录!',
            onClose: () => userStore.logout().then(resolve)
          })
        })

        next({
          path: loginRoutePath,
          query: { redirect: to.fullPath }
        })
      }
      return
    }

    return next()
  }

  if (!to || !to.name) {
    return next({ path: loginRoutePath })
  }

  if (whiteRouteList.includes(to.path)) {
    return next()
  }

  await new Promise(resolve => {
    Notification.error({
      duration: 0.8,
      message: '系统通知',
      description: 'token 已过期, 请重新登录!',
      onClose: () => userStore.logout().then(resolve)
    })
  })

  next({
    path: loginRoutePath,
    query: { redirect: to.fullPath }
  })
})

/**
 * 路由处理
 */
router.afterEach(to => {
  let domTitle = ''

  for (const route of to.matched) {
    const isNotIndexRoute = route.path !== '/'
    const isNotEmptyTitle = typeof route.meta.title === 'string' && route.meta.title.trim()

    isNotIndexRoute && isNotEmptyTitle
      ? domTitle = domTitle ? domTitle + ' - ' + isNotEmptyTitle : isNotEmptyTitle
      : null
  }

  useAppStore().toggleDomTitle(domTitle)
  NProgress.done()
})
