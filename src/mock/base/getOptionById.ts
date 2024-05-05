import { promiser, resolver, worker, rester } from '@/mock/setup'
import { http, HttpResponse } from 'msw'

const tag = '查询 Option 下拉框'
const url = resolver('/base/getOptionById')

worker.use(
  http.post(url, async req => {
    const body = await rester.body(req)
    const query = await rester.query(req)
    const params = await rester.params(req)
    const printer = await rester.printer(tag)

    let resource: any = null

    switch (body && body.id) {
      case 'dept': {
        resource = {
          code: '0000',
          message: null,
          result: [
            { label: '公司部', parentId: '101.100.131', value: '1126534161135795126' },
            { label: '人事部', parentId: '101.100.131', value: '1126534161135795127' },
            { label: '财务部', parentId: '101.100.131', value: '1126534161135795128' },
            { label: '市场部', parentId: '101.100.131', value: '1126534161135795129' },
            { label: '运维部', parentId: '101.100.131', value: '1126534161135795130' },
            { label: '系统部', parentId: '101.100.131', value: '1126534161135795131' },
            { label: '软件部', parentId: '101.100.131', value: '1126534161135795132' },
            { label: '大数据中心', parentId: '101.100.131', value: '1126534161135795133' },
            { label: '技术中心', parentId: '101.100.131', value: '1126534161135795134' },
            { label: '研发中心', parentId: '101.100.131', value: '1126534161135795135' },
          ],
        }
        break
      }
      default: {
        resource = {
          code: '0000',
          message: null,
          result: [],
        }
      }
    }

    printer(log => {
      log('[body] - ', body)
      log('[query] - ', query)
      log('[params] - ', params)
      log('[resource] - ', resource)
    })

    return promiser(
      HttpResponse.json(resource),
      0,
    )
  }),
)
