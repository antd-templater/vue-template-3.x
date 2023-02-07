import { rest } from 'msw'
import util from '@/mock/util'
import api from '@/api/resource'

const tag = '根据角色查询菜单资源'
const fetch = rest.post
const request = util.resolve(api.getResourceMenuByRole)

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
        treeNodes: [
          {
            label: '根目录',
            value: '0',
            children: [
              {
                label: '系统管理',
                value: '27245863256459422',
                children: [
                  { children: [], label: '组织管理', value: '1127282136000102507' },
                  { children: [], label: '资源管理', value: '27245863256459445' },
                  { children: [], label: '角色管理', value: '27245863256459495' },
                  { children: [], label: '用户管理', value: '1127282136000102579' }
                ]
              }
            ]
          }
        ],
        treeSelect: [
          '27245863256459422',
          '1127282136000102507',
          '27245863256459445',
          '27245863256459495',
          '1127282136000102579'
        ]
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
