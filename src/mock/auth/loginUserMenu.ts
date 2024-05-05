import { promiser, resolver, worker, rester } from '@/mock/setup'
import { http, HttpResponse } from 'msw'

const tag = '获取用户菜单'
const url = resolver('/auth/loginUserMenu')

worker.use(
  http.post(url, async req => {
    const body = await rester.body(req)
    const query = await rester.query(req)
    const params = await rester.params(req)
    const printer = await rester.printer(tag)

    const resource = {
      code: '0000',
      message: null,
      result: [
        {
          sort: 1000000,
          id: '27245863256459422',
          name: 'system',
          path: '',
          parentId: '0',
          component: 'PageView',
          redirect: '/system/OrganizeManage',
          meta: {
            icon: 'CodepenOutlined',
            title: '系统管理',
            hideChildInMenu: 'N',
            hideInMenu: 'N',
            allowCache: 'Y',
          },
        },
        {
          sort: 1000100,
          id: '1127282136000102507',
          name: 'OrganizeManage',
          path: '/system/OrganizeManage',
          parentId: '27245863256459422',
          component: 'OrganizeManage',
          redirect: '',
          meta: {
            icon: 'CodepenOutlined',
            title: '组织管理',
            hideChildInMenu: 'N',
            hideInMenu: 'N',
            allowCache: 'Y',
          },
        },
        {
          sort: 1000200,
          id: '27245863256459445',
          name: 'ResourceManage',
          path: '/system/ResourceManage',
          parentId: '27245863256459422',
          component: 'ResourceManage',
          redirect: '',
          meta: {
            icon: 'CodepenOutlined',
            title: '资源管理',
            hideChildInMenu: 'N',
            hideInMenu: 'N',
            allowCache: 'Y',
          },
        },
        {
          sort: 1000300,
          id: '27245863256459495',
          name: 'RoleManage',
          path: '/system/RoleManage',
          parentId: '27245863256459422',
          component: 'RoleManage',
          redirect: '',
          meta: {
            icon: 'CodepenOutlined',
            title: '角色管理',
            hideChildInMenu: 'N',
            hideInMenu: 'N',
            allowCache: 'Y',
          },
        },
        {
          sort: 1000400,
          id: '1127282136000102579',
          name: 'UserManage',
          path: '/system/UserManage',
          parentId: '27245863256459422',
          component: 'UserManage',
          redirect: '',
          meta: {
            icon: 'CodepenOutlined',
            title: '用户管理',
            hideChildInMenu: 'N',
            hideInMenu: 'N',
            allowCache: 'Y',
          },
        },
      ],
    }

    printer(log => {
      log('[body] - ', body)
      log('[query] - ', query)
      log('[params] - ', params)
      log('[resource] - ', resource)
    })

    return promiser(
      HttpResponse.json(resource),
      0,
    )
  }),
)
