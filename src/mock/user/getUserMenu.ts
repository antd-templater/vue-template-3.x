import { rest } from 'msw'
import util from '@/mock/util'
import api from '@/api/user'

const tag = '获取用户菜单'
const fetch = rest.post
const request = util.resolve(api.getUserMenu)

util.worker.use(
  fetch(request, async(req, res, ctx) => {
    const body = await util.body(req)
    const query = await util.query(req)
    const params = await util.params(req)
    const printer = await util.printer(tag)

    const result = {
      code: '0000',
      message: null,
      result: [
        {
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
            allowCache: 'Y'
          }
        },
        {
          id: '1127282136000102507',
          name: 'OrganizeManage',
          path: '/system/OrganizeManage',
          parentId: '27245863256459422',
          component: 'OrganizeManage',
          redirect: '',
          meta: {
            icon: '',
            title: '组织管理',
            hideChildInMenu: 'N',
            hideInMenu: 'N',
            allowCache: 'Y'
          }
        },
        {
          id: '27245863256459445',
          name: 'ResourceManage',
          path: '/system/ResourceManage',
          parentId: '27245863256459422',
          component: 'ResourceManage',
          redirect: '',
          meta: {
            icon: '',
            title: '资源管理',
            hideChildInMenu: 'N',
            hideInMenu: 'N',
            allowCache: 'Y'
          }
        },
        {
          id: '27245863256459495',
          name: 'RoleManage',
          path: '/system/RoleManage',
          parentId: '27245863256459422',
          component: 'RoleManage',
          redirect: '',
          meta: {
            icon: '',
            title: '角色管理',
            hideChildInMenu: 'N',
            hideInMenu: 'N',
            allowCache: 'Y'
          }
        },
        {
          id: '1127282136000102579',
          name: 'UserManage',
          path: '/system/UserManage',
          parentId: '27245863256459422',
          component: 'UserManage',
          redirect: '',
          meta: {
            icon: '',
            title: '用户管理',
            hideChildInMenu: 'N',
            hideInMenu: 'N',
            allowCache: 'Y'
          }
        }
      ]
    }

    printer(log => {
      log('[body] - ', body)
      log('[query] - ', query)
      log('[params] - ', params)
      log('[result] - ', result)
    })

    return res(ctx.json(result))
  })
)
