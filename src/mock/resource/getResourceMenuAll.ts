import { rest } from 'msw'
import util from '@/mock/util'
import api from '@/api/resource'

const tag = '查询所有菜单资源'
const fetch = rest.post
const request = util.resolve(api.getResourceMenuAll)

util.worker.use(
  fetch(request, async(req, res, ctx) => {
    const body = await util.body(req)
    const query = await util.query(req)
    const params = await util.params(req)
    const printer = await util.printer(tag)

    const result = {
      code: '0000',
      message: null,
      result: {
        nodes: [
          {
            sort: 1000000,
            path: '',
            icon: 'CodepenOutlined',
            title: '系统管理',
            redirect: '',
            parentId: '0',
            component: 'PageView',
            resourceId: '27245863256459422',
            resourceName: 'system',
            resourceType: 'm',
            hideChildInMenu: 'N',
            hideInMenu: 'N',
            allowCache: 'Y',
            activity: 'Y'
          },
          {
            sort: 1000100,
            path: '/system/OrganizeManage',
            icon: '',
            title: '组织管理',
            redirect: '',
            parentId: '27245863256459422',
            component: 'OrganizeManage',
            resourceId: '1127282136000102507',
            resourceName: 'OrganizeManage',
            resourceType: 'm',
            hideChildInMenu: 'N',
            hideInMenu: 'N',
            allowCache: 'Y',
            activity: 'Y'
          },
          {
            sort: 1000200,
            path: '/system/ResourceManage',
            icon: '',
            title: '资源管理',
            redirect: '',
            parentId: '27245863256459422',
            component: 'ResourceManage',
            resourceId: '27245863256459445',
            resourceName: 'ResourceManage',
            resourceType: 'm',
            hideChildInMenu: 'N',
            hideInMenu: 'N',
            allowCache: 'Y',
            activity: 'Y'
          },
          {
            sort: 1000300,
            path: '/system/RoleManage',
            icon: '',
            title: '角色管理',
            redirect: '',
            parentId: '27245863256459422',
            component: 'RoleManage',
            resourceId: '27245863256459495',
            resourceName: 'RoleManage',
            resourceType: 'm',
            hideChildInMenu: 'N',
            hideInMenu: 'N',
            allowCache: 'Y',
            activity: 'Y'
          },
          {
            sort: 1000400,
            path: '/system/UserManage',
            icon: '',
            title: '用户管理',
            redirect: '',
            parentId: '27245863256459422',
            component: 'UserManage',
            resourceId: '1127282136000102579',
            resourceName: 'UserManage',
            resourceType: 'm',
            hideChildInMenu: 'N',
            hideInMenu: 'N',
            allowCache: 'Y',
            activity: 'Y'
          }
        ],
        treeNodes: [
          {
            label: '根目录',
            value: '0',
            children: [
              {
                label: '系统管理',
                value: '27245863256459422',
                children: [
                  { children: [], label: '组织管理', value: '1127282136000102507' },
                  { children: [], label: '资源管理', value: '27245863256459445' },
                  { children: [], label: '角色管理', value: '27245863256459495' },
                  { children: [], label: '用户管理', value: '1127282136000102579' }
                ]
              }
            ]
          }
        ]
      }
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
