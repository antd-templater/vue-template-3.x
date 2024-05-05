import { promiser, resolver, worker, rester } from '@/mock/setup'
import { http, HttpResponse } from 'msw'

const tag = '查询所有菜单资源'
const url = resolver('/resource/getResourceTreeInfo')

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
          title: '根目录',
          resourceId: '0',
          children: [
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
              activity: 'Y',
              children: [
                {
                  sort: 1000100,
                  path: '/system/OrganizeManage',
                  icon: 'CodepenOutlined',
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
                  activity: 'Y',
                },
                {
                  sort: 1000200,
                  path: '/system/ResourceManage',
                  icon: 'CodepenOutlined',
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
                  activity: 'Y',
                },
                {
                  sort: 1000300,
                  path: '/system/RoleManage',
                  icon: 'CodepenOutlined',
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
                  activity: 'Y',
                },
                {
                  sort: 1000400,
                  path: '/system/UserManage',
                  icon: 'CodepenOutlined',
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
                  activity: 'Y',
                },
              ],
            },
          ],
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
