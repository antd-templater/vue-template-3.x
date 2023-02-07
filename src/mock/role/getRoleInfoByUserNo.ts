import { rest } from 'msw'
import util from '@/mock/util'
import api from '@/api/role'

const tag = '获取用户角色列表'
const fetch = rest.post
const request = util.resolve(api.getRoleInfoByUserNo)

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
          orgId: '101.100.131',
          roleId: '27442970747734159',
          roleName: '系统管理',
          dataFlag: '2',
          activity: 'Y'
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
