import { promiser, resolver, worker, rester } from '@/mock/setup'
import { http, HttpResponse } from 'msw'

const tag = '系统登录'
const url = resolver('/auth/:login')

worker.use(
  http.post(url, async req => {
    const body = await rester.body(req)
    const query = await rester.query(req)
    const params = await rester.params(req)
    const printer = await rester.printer(tag)

    let result: any = null

    if (body.params.username !== 'admin' || body.params.password !== '25d55ad283aa400af464c76d713c07ad') {
      result = {
        code: '9999',
        message: '用户名密码错误',
        result: null
      }
    }

    if (body.params.username === 'admin' && body.params.password === '25d55ad283aa400af464c76d713c07ad') {
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

    return promiser(
      HttpResponse.json(result),
      100
    )
  })
)
