import { rest } from 'msw'
import util from '@/mock/util'
import api from '@/api/resource'

const tag = '删除资源信息'
const fetch = rest.post
const request = util.resolve(api.deleteResourceInfo)

util.worker.use(
  fetch(request, async(req, res, ctx) => {
    const body = await util.body(req)
    const query = await util.query(req)
    const params = await util.params(req)
    const printer = await util.printer(tag)

    const result = {
      code: '0000',
      message: null,
      result: null
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
