import { promiser, resolver, worker, rester } from '@/mock/setup'
import { http, HttpResponse } from 'msw'

const tag = '分页查询资源信息'
const url = resolver('/resource/getResourceListInfo')

worker.use(
  http.post(url, async req => {
    const body = await rester.body(req)
    const query = await rester.query(req)
    const params = await rester.params(req)
    const printer = await rester.printer(tag)

    let resource:any = null

    switch (body.params.parentId) {
      case '27245863256459422': {
        resource = {
          code: '0000',
          message: null,
          result: {
            data: [
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
                activity: 'Y'
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
                activity: 'Y'
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
                activity: 'Y'
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
                activity: 'Y'
              }
            ],
            pageNo: 1,
            pageSize: 20,
            totalSize: 4,
            totalPage: 1
          }
        }
        break
      }
      case '1127282136000102507': {
        resource = {
          code: '0000',
          message: null,
          result: {
            data: [
              {
                sort: 1,
                title: '新增',
                parentId: '1127282136000102507',
                component: 'OrganizeManage',
                resourceId: '1127282136000102508',
                resourceName: 'add',
                resourceType: 'b',
                activity: 'Y'
              },
              {
                sort: 2,
                title: '删除',
                parentId: '1127282136000102507',
                component: 'OrganizeManage',
                resourceId: '1127282136000102509',
                resourceName: 'del',
                resourceType: 'b',
                activity: 'Y'
              },
              {
                sort: 3,
                title: '修改',
                parentId: '1127282136000102507',
                component: 'OrganizeManage',
                resourceId: '1127282136000102510',
                resourceName: 'edit',
                resourceType: 'b',
                activity: 'Y'
              },
              {
                sort: 4,
                title: '查询',
                parentId: '1127282136000102507',
                component: 'OrganizeManage',
                resourceId: '1127282136000102511',
                resourceName: 'query',
                resourceType: 'b',
                activity: 'Y'
              }
            ],
            pageNo: 1,
            pageSize: 20,
            totalSize: 4,
            totalPage: 1
          }
        }
        break
      }
      case '27245863256459445': {
        resource = {
          code: '0000',
          message: null,
          result: {
            data: [
              {
                sort: 1,
                title: '新增',
                parentId: '27245863256459445',
                component: 'ResourceManage',
                resourceId: '27245863256459447',
                resourceName: 'add',
                resourceType: 'b',
                activity: 'Y'
              },
              {
                sort: 2,
                title: '删除',
                parentId: '27245863256459445',
                component: 'ResourceManage',
                resourceId: '27245863256459449',
                resourceName: 'del',
                resourceType: 'b',
                activity: 'Y'
              }
            ],
            pageNo: 1,
            pageSize: 20,
            totalSize: 2,
            totalPage: 1
          }
        }
        break
      }
      case '27245863256459495': {
        resource = {
          code: '0000',
          message: null,
          result: {
            data: [
              {
                sort: 1,
                title: '新增',
                parentId: '27245863256459495',
                component: 'RoleManage',
                resourceId: '27245863256459496',
                resourceName: 'add',
                resourceType: 'b',
                activity: 'Y'
              },
              {
                sort: 2,
                title: '删除',
                parentId: '27245863256459495',
                component: 'RoleManage',
                resourceId: '27245863256459497',
                resourceName: 'del',
                resourceType: 'b',
                activity: 'Y'
              },
              {
                sort: 3,
                title: '修改',
                parentId: '27245863256459495',
                component: 'RoleManage',
                resourceId: '27245863256459498',
                resourceName: 'edit',
                resourceType: 'b',
                activity: 'Y'
              },
              {
                sort: 4,
                title: '查询',
                parentId: '27245863256459495',
                component: 'RoleManage',
                resourceId: '27245863256459499',
                resourceName: 'query',
                resourceType: 'b',
                activity: 'Y'
              }
            ],
            pageNo: 1,
            pageSize: 20,
            totalSize: 4,
            totalPage: 1
          }
        }
        break
      }
      case '1127282136000102579': {
        resource = {
          code: '0000',
          message: null,
          result: {
            data: [
              {
                sort: 1,
                title: '新增',
                parentId: '1127282136000102579',
                component: 'UserManage',
                resourceId: '1127282136000102580',
                resourceName: 'add',
                resourceType: 'b',
                activity: 'Y'
              },
              {
                sort: 2,
                title: '删除',
                parentId: '1127282136000102579',
                component: 'UserManage',
                resourceId: '1127282136000102581',
                resourceName: 'del',
                resourceType: 'b',
                activity: 'Y'
              },
              {
                sort: 3,
                title: '修改',
                parentId: '1127282136000102579',
                component: 'UserManage',
                resourceId: '1127282136000102582',
                resourceName: 'edit',
                resourceType: 'b',
                activity: 'Y'
              },
              {
                sort: 4,
                title: '查询',
                parentId: '1127282136000102579',
                component: 'UserManage',
                resourceId: '1127282136000102583',
                resourceName: 'query',
                resourceType: 'b',
                activity: 'Y'
              }
            ],
            pageNo: 1,
            pageSize: 20,
            totalSize: 4,
            totalPage: 1
          }
        }
        break
      }
      default: {
        resource = {
          code: '0000',
          message: null,
          result: {
            data: [],
            pageNo: 1,
            pageSize: 20,
            totalSize: 0,
            totalPage: 0
          }
        }
      }
    }

    printer(log => {
      log('[body] - ', body)
      log('[query] - ', query)
      log('[params] - ', params)
      log('[resource] - ', resource)
    })

    return promiser(
      HttpResponse.json(resource),
      0
    )
  })
)
