import { rest } from 'msw'
import util from '@/mock/util'
import api from '@/api/user'

const tag = '获取用户信息'
const fetch = rest.post
const request = util.resolve(api.getUserInfo)

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
        userNo: '182588xxx88',
        userName: 'admin',
        mobilePhone: '182588xxx88',
        postName: '系统管理',
        orgId: '101.100.131',
        orgName: '北仑网安通信有限公司',
        deptName: '软件部',
        deptId: '1126534161135795132',
        dataFlag: '2',
        activity: 'Y',
        role: {
          permissions: [
            {
              roleId: '27442970747734159',
              permissionId: 'ResourceManage',
              actionEntitySet: [
                { action: 'add', defaultCheck: false, describe: '新增' },
                { action: 'del', defaultCheck: false, describe: '删除' }
              ]
            },
            {
              roleId: '27442970747734159',
              permissionId: 'RoleManage',
              actionEntitySet: [
                { action: 'add', defaultCheck: false, describe: '新增' },
                { action: 'del', defaultCheck: false, describe: '删除' },
                { action: 'edit', defaultCheck: false, describe: '修改' },
                { action: 'query', defaultCheck: false, describe: '查询' }
              ]
            },
            {
              roleId: '27442970747734159',
              permissionId: 'OrganizeManage',
              actionEntitySet: [
                { action: 'add', defaultCheck: false, describe: '新增' },
                { action: 'del', defaultCheck: false, describe: '删除' },
                { action: 'edit', defaultCheck: false, describe: '修改' },
                { action: 'query', defaultCheck: false, describe: '查询' }
              ]
            },
            {
              roleId: '27442970747734159',
              permissionId: 'UserManage',
              actionEntitySet: [
                { action: 'add', defaultCheck: false, describe: '新增' },
                { action: 'del', defaultCheck: false, describe: '删除' },
                { action: 'edit', defaultCheck: false, describe: '修改' },
                { action: 'query', defaultCheck: false, describe: '查询' }
              ]
            }
          ]
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
