import BasicLayout from '@/layout/BasicLayout'
import PageFrame from '@/layout/PageFrame'

/**
 * @rootRouter 菜单路由
 * @externalRouter 外部路由
 * @notFoundRouter 异常路由
 * @constantRouterMap 静态路由
 */
export default {
  rootRoute: {
    key: 'Basic',
    name: 'Basic',
    path: '/',
    redirect: '/index',
    component: BasicLayout,
    meta: { title: '首页' },
    children: []
  },

  externalRoute: {
    key: 'ExternalLink',
    name: 'ExternalLink',
    path: '/external/link/:path(.*)?',
    component: PageFrame,
    meta: {
      title: '外部链接',
      match: 'external',
      external: '',
      componentName: 'ExternalLink',
      hideChildInMenu: true,
      hideInMenu: true,
      allowCache: true
    }
  },

  notFoundRoutes: [
    {
      name: 'PageError403',
      path: '/PageError403',
      component: () => import(`@/views/error/PageError403.vue`)
    },
    {
      name: 'PageError404',
      path: '/PageError404',
      component: () => import(`@/views/error/PageError404.vue`)
    },
    {
      name: 'PageError500',
      path: '/PageError500',
      component: () => import(`@/views/error/PageError500.vue`)
    },
    {
      path: '/:catchAll(.*)',
      redirect: '/PageError404'
    }
  ],

  constantRoutes: [] as any[]
}
