import { rest } from 'msw'
import util from '@/mock/util'
import api from '@/api/auth'

const tag = '系统登录'
const fetch = rest.post
const request = util.resolve(api.login)

util.worker.use(
  fetch(request, async(req, res, ctx) => {
    const body = await util.body(req)
    const query = await util.query(req)
    const params = await util.params(req)
    const printer = await util.printer(tag)

    let result: any = null

    if (body.param.username !== 'admin' || body.param.password !== '25d55ad283aa400af464c76d713c07ad') {
      result = {
        code: '9999',
        message: '用户名密码错误',
        result: null
      }
    }

    if (body.param.username === 'admin' && body.param.password === '25d55ad283aa400af464c76d713c07ad') {
      result = {
        code: '0000',
        message: null,
        result: {
          data: {
            userNo: '182588xxx88',
            userName: 'admin',
            mobilePhone: '182588xxx88',
            orgId: '101.100.131',
            orgName: '北仑网安通信有限公司',
            deptName: '软件部',
            deptId: '1126534161135795132',
            activity: 'Y'
          },
          token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxODI1ODc2NDMyMSIsImV4cCI6MTY0MjQ4NTQwNX0.gFrCkMY5OlheC7sF7elhb8cF2fvkD-dj950xklyI14Q'
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
