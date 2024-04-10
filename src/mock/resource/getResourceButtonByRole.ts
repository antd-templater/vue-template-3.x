import { promiser, resolver, worker, rester } from '@/mock/setup'
import { http, HttpResponse } from 'msw'

const tag = '根据角色查询按钮资源'
const url = resolver('/resource/getResourceButtonByRole')

worker.use(
  http.post(url, async req => {
    const body = await rester.body(req)
    const query = await rester.query(req)
    const params = await rester.params(req)
    const printer = await rester.printer(tag)

    const result = {
      code: '0000',
      message: null,
      result: [] as any
    }

    for (const item of body.params) {
      if (item.roleId === '27442970747734159' && item.menuId === '27245863256459422') {
        result.result.push({
          id: '27245863256459422',
          actionsOptions: [],
          selected: []
        })
      }
      if (item.roleId === '27442970747734159' && item.menuId === '1127282136000102507') {
        result.result.push({
          id: '1127282136000102507',
          actionsOptions: [
            { label: '新增', value: '1127282136000102508' },
            { label: '删除', value: '1127282136000102509' },
            { label: '修改', value: '1127282136000102510' },
            { label: '查询', value: '1127282136000102511' }
          ],
          selected: [
            '1127282136000102508',
            '1127282136000102509',
            '1127282136000102510',
            '1127282136000102511'
          ]
        })
      }
      if (item.roleId === '27442970747734159' && item.menuId === '27245863256459445') {
        result.result.push({
          id: '27245863256459445',
          actionsOptions: [
            { label: '新增', value: '27245863256459447' },
            { label: '删除', value: '27245863256459449' }
          ],
          selected: ['27245863256459447', '27245863256459449']
        })
      }
      if (item.roleId === '27442970747734159' && item.menuId === '27245863256459495') {
        result.result.push({
          id: '27245863256459495',
          actionsOptions: [
            { label: '新增', value: '27245863256459496' },
            { label: '删除', value: '27245863256459497' },
            { label: '修改', value: '27245863256459498' },
            { label: '查询', value: '27245863256459499' }
          ],
          selected: [
            '27245863256459496',
            '27245863256459497',
            '27245863256459498',
            '27245863256459499'
          ]
        })
      }
      if (item.roleId === '27442970747734159' && item.menuId === '1127282136000102579') {
        result.result.push({
          id: '1127282136000102579',
          actionsOptions: [
            { label: '新增', value: '1127282136000102580' },
            { label: '删除', value: '1127282136000102581' },
            { label: '修改', value: '1127282136000102582' },
            { label: '查询', value: '1127282136000102583' }
          ],
          selected: [
            '1127282136000102580',
            '1127282136000102581',
            '1127282136000102582',
            '1127282136000102583'
          ]
        })
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
