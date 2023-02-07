import { rest } from 'msw'
import util from '@/mock/util'
import api from '@/api/organize'

const tag = '获取组织 Tree 列表'
const fetch = rest.post
const request = util.resolve(api.getOrganizeInfoTree)

util.worker.use(
  fetch(request, async(req, res, ctx) => {
    const body = await util.body(req)
    const query = await util.query(req)
    const params = await util.params(req)
    const printer = await util.printer(tag)

    let result: any = null

    switch (body && body.param && body.param.orgId) {
      case '0': {
        result = {
          code: '0000',
          message: null,
          result: [
            {
              key: '1',
              isOrg: 'Y',
              isLeaf: false,
              title: '浙大远疆投资集团有限公司',
              orgShortName: '集团公司'
            }
          ]
        }
        break
      }
      case '1': {
        result = {
          code: '0000',
          message: null,
          result: [
            {
              key: '101.100',
              isOrg: 'Y',
              isLeaf: false,
              title: '港运信息有限公司',
              orgShortName: '港运公司'
            }
          ]
        }
        break
      }
      case '101.100': {
        result = {
          code: '0000',
          message: null,
          result: [
            {
              key: '101.100.131',
              isOrg: 'Y',
              isLeaf: true,
              title: '北仑网安通信有限公司',
              orgShortName: '北仑网安'
            },
            {
              key: '101.100.138',
              isOrg: 'Y',
              isLeaf: true,
              title: '宁财港务有限公司',
              orgShortName: '宁财港务'
            }
          ]
        }
        break
      }
      default: {
        result = {
          code: '0000',
          message: null,
          result: []
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
