import UserLayout from '@/layout/UserLayout'
import defaultRouter from '@/configure/defaultRouter'
import type { Route } from '@/router/generate-typing'

interface defineRoute extends Route { sort?: number; }

export const baseRoutes: defineRoute[] = defaultRouter.constantRoutes // 基础路由
export const menuRoutes: defineRoute[] = defaultRouter.rootRoute.children // 菜单路由

baseRoutes.push(
  {
    path: '/index',
    name: 'index',
    redirect: '/system/OrganizeManage',
  },
  {
    path: '/auth',
    redirect: '/auth/Login',
    component: UserLayout,
    children: [
      {
        path: 'Login',
        name: 'Login',
        component: () => import(`@/views/auth/Login.vue`),
        meta: { title: '系统登录' },
      },
    ],
  },
)
