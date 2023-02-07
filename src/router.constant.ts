import UserLayout from '@/layout/UserLayout'
import defaultRouter from '@/configure/defaultRouter'
import type { Route } from '@/router/generate-typing'

export const menuRoutes: Route[] = defaultRouter.rootRoute.children // 菜单路由
export const baseRoutes: Route[] = defaultRouter.constantRoutes // 基础路由

baseRoutes.push(
  {
    path: '/index',
    name: 'index',
    redirect: '/system/OrganizeManage'
  },
  {
    path: '/login',
    redirect: '/login/Login',
    component: UserLayout,
    children: [
      {
        path: 'Login',
        name: 'Login',
        component: () => import(`@/views/login/Login.vue`),
        meta: { title: '系统登录' }
      }
    ]
  }
)
