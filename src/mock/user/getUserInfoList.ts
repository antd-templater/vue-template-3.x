import { rest } from 'msw'
import util from '@/mock/util'
import api from '@/api/user'

const tag = '获取用户列表'
const fetch = rest.post
const request = util.resolve(api.getUserInfoList)

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
        data: [
          {
            userNo: '182588xxx88',
            userName: 'admin',
            password: '12345678',
            mobilePhone: '182588xxx88',
            idCard: '330206199901011111',
            orgId: '101.100.131',
            orgName: '北仑网安通信有限公司',
            deptName: '软件部',
            deptId: '1126534161135795132',
            postName: '系统管理',
            activity: 'Y'
          },
          {
            userNo: '182588xxx88',
            userName: '林某',
            password: '12345678',
            mobilePhone: '182588xxx88',
            idCard: '330204198603281111',
            orgId: '101.100.131',
            orgName: '北仑网安通信有限公司',
            deptName: '软件部',
            deptId: '1126534161135795132',
            postName: '系统管理',
            activity: 'Y'
          }
        ],
        pageNo: 1,
        pageSize: 20,
        totalCount: 2,
        totalPage: 1
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
