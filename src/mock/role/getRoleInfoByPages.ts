import { promiser, resolver, worker, rester } from '@/mock/setup'
import { http, HttpResponse } from 'msw'

const tag = '分页获取角色列表'
const url = resolver('/role/getRoleInfoByPages')

worker.use(
  http.post(url, async req => {
    const body = await rester.body(req)
    const query = await rester.query(req)
    const params = await rester.params(req)
    const printer = await rester.printer(tag)

    const result = {
      code: '0000',
      message: null,
      result: {
        data: [
          {
            orgId: '101.100.131',
            roleId: '27442970747734159',
            roleName: '系统管理',
            dataFlag: '2',
            activity: 'Y'
          }
        ],
        pageNo: 1,
        pageSize: 20,
        totalSize: 1,
        totalPage: 1
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
      0
    )
  })
)
