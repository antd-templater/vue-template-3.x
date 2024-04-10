import { promiser, resolver, worker, rester } from '@/mock/setup'
import { http, HttpResponse } from 'msw'

const tag = '获取用户列表'
const url = resolver('/user/getUserInfoList')

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
            userNo: '182588xxx88',
            userName: 'admin',
            password: '12345678',
            mobilePhone: '182588xxx88',
            idCard: '330206199901011111',
            orgId: '101.100.131',
            orgName: '北仑网安通信有限公司',
            deptName: '软件部',
            deptId: '1126534161135795132',
            roleId: ['27442970747734159'],
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
            roleId: ['27442970747734159'],
            postName: '系统管理',
            activity: 'Y'
          }
        ],
        pageNo: 1,
        pageSize: 20,
        totalSize: 2,
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
