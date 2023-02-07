import { rest } from 'msw'
import util from '@/mock/util'
import api from '@/api/resource'

const tag = '查询资源信息'
const fetch = rest.post
const request = util.resolve(api.getResourceInfoList)

util.worker.use(
  fetch(request, async(req, res, ctx) => {
    const body = await util.body(req)
    const query = await util.query(req)
    const params = await util.params(req)
    const printer = await util.printer(tag)

    let result:any = null

    switch (body.param.parentId) {
      case '1127282136000102507': {
        result = {
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
            totalCount: 4,
            totalPage: 1
          }
        }
        break
      }
      case '27245863256459445': {
        result = {
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
            totalCount: 2,
            totalPage: 1
          }
        }
        break
      }
      case '27245863256459495': {
        result = {
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
            totalCount: 4,
            totalPage: 1
          }
        }
        break
      }
      case '1127282136000102579': {
        result = {
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
            totalCount: 4,
            totalPage: 1
          }
        }
        break
      }
      case '1127282136000102508': {
        result = {
          code: '0000',
          message: null,
          result: {
            data: [
              {
                sort: 0,
                title: '组织新增',
                parentId: '1127282136000102508',
                component: 'OrganizeManage',
                resourceId: '26722904834083932',
                resourceName: '/api/resource/add',
                resourceType: 's',
                activity: 'Y'
              }
            ],
            pageNo: 1,
            pageSize: 20,
            totalCount: 1,
            totalPage: 1
          }
        }
        break
      }
      default: {
        result = {
          code: '0000',
          message: null,
          result: {
            data: [],
            pageNo: 1,
            pageSize: 20,
            totalCount: 0,
            totalPage: 0
          }
        }
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
