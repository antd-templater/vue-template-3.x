import { rest } from 'msw'
import util from '@/mock/util'
import api from '@/api/base'

const tag = '查询 Option 下拉框'
const fetch = rest.post
const request = util.resolve(api.getOptionById)

util.worker.use(
  fetch(request, async(req, res, ctx) => {
    const body = await util.body(req)
    const query = await util.query(req)
    const params = await util.params(req)
    const printer = await util.printer(tag)

    let result: any = null

    switch (body && body.id) {
      case 'dept': {
        result = {
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
            { label: '其他', parentId: '101.100.131', value: '1126534161135795140' },
            { label: '后勤中心', parentId: '101.100.131', value: '1126534161135795642' },
            { label: '工程部', parentId: '101.100.105', value: '1127020120488650555' },
            { label: '工程部', value: '1127020120488650920' },
            { label: '工程部', parentId: '101.100.103', value: '1127020120488651038' },
            { label: '工程部', parentId: '101.100.109', value: '1127020120488651039' },
            { label: '工程部', value: '1127020120488651040' },
            { label: '工程部', value: '1127020120488651041' },
            { label: '工程部', parentId: '101.100.111', value: '1127020120488651042' },
            { label: '工程部', parentId: '101.100.106', value: '1127020120488651043' },
            { label: '工程部', parentId: '101.100.114', value: '1127020120488651044' },
            { label: '工程部', parentId: '101.100.110', value: '1127020120488651045' },
            { label: '工程部', parentId: '101.100.106.100', value: '1127020120488651046' },
            { label: '工程部', parentId: '101.100.122', value: '1127020120488651047' },
            { label: '工程部', parentId: '101.103', value: '1127020120488651048' },
            { label: '工程部', parentId: '101.106', value: '1127020120488651049' },
            { label: '工程部', parentId: '101.100.107', value: '1127020120488651050' },
            { label: '工程部', parentId: '101.100.112', value: '1127020120488651051' },
            { label: '工程部', parentId: '101.122', value: '1127020120488651054' },
            { label: '工程部', parentId: '101.100.117', value: '1127020120488651055' },
            { label: '工程部', parentId: '101.102', value: '1127020120488651056' },
            { label: '工程部', parentId: '101.100.130', value: '1127020120488651057' },
            { label: '工程部', parentId: '101.100.108', value: '1127020120488651058' },
            { label: '工程部', parentId: '101.100.128', value: '1127020120488651059' },
            { label: '工程部', parentId: '101.100.104', value: '1127020120488651060' },
            { label: '工程部', parentId: '101.101', value: '1127020120488651736' },
            { label: '工程部', parentId: '101.100.113', value: '1127020120488651737' },
            { label: '工程部', parentId: '101.100.121', value: '1127020120488651738' },
            { label: '工程部', parentId: '101.105', value: '1127020120488651739' },
            { label: '工程部', parentId: '101.100.116', value: '1127020120488651740' },
            { label: '工程部', parentId: '101.100.131', value: '1127020120488651741' },
            { label: '工程部', parentId: '101.100.123', value: '1127020120488651742' },
            { label: '工信部', parentId: '101.101.105', value: '1127020120488701925' },
            { label: '工程部', parentId: '112.001', value: '1127020120488703785' },
            { label: '能耗部', parentId: '101.104', value: '1127020120488703859' },
            { label: '工程部', parentId: '101.100.113.126', value: '1127020120488703869' },
            { label: '工信部', parentId: '101.100', value: '1127020120488704171' },
            { label: '工程部', parentId: '101.112', value: '1127020120488705222' },
            { label: '工程部', parentId: '101.121', value: '1127020120488705223' },
            { label: '工程部', parentId: '101.110', value: '1127020120488705224' },
            { label: '工程部', parentId: '101.100.120', value: '1127020120488706324' },
            { label: '工程部', parentId: '101.107', value: '1127020120488706325' },
            { label: '工程部', parentId: '101.100.102', value: '1127282136000102400' },
            { label: '工程部', value: '1127313978568877369' },
            { label: '信息部', parentId: '101.102', value: '11190472844512005' },
            { label: '信息部', parentId: '101.100.107', value: '11190472844515000' },
            { label: '物资部', parentId: '101.119', value: '11190472844519693' },
            { label: '行政部', parentId: '101.100.106.100', value: '99401954366589467' },
            { label: '物资部', parentId: '101.100.131', value: '99401954366590713' },
            { label: '物资部', parentId: '101.100.122', value: '99401954366595494' },
            { label: '物资部', parentId: '101.100.127', value: '99401954366597444' }
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
