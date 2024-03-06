import { request } from '@/utils/request'
import { takeFixed } from '@/utils/common'
import { TakeFixed } from '@/utils/common'
import { takePadEnd } from '@/utils/common'
import { TakePadEnd } from '@/utils/common'
import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'
import { AxiosError } from 'axios'


vi.mock('@/store/user', () => {
  const module = {
    token: '',
    logout: () => Promise.resolve()
  }
  return { default: vi.fn(() => module) }
})

describe('@utils/common.ts', () => {
  it('Check Call takeFixed', () => expect(takeFixed('12.345', 2)).toBe('12.35'))
  it('Check Call takePadEnd', () => expect(takePadEnd('12.34', 3)).toBe('12.340'))
  it('Check Type takeFixed', () => expectTypeOf(takeFixed).toEqualTypeOf<TakeFixed>())
  it('Check Type takePadEnd', () => expectTypeOf(takePadEnd).toEqualTypeOf<TakePadEnd>())
})

describe('@utils/request.ts', () => {
  const server = setupServer(
    http.post('http://api.test.com/updateUserInfo', () => {
      return HttpResponse.json({
        code: '0000',
        message: null,
        result: 'success'
      })
    }),

    http.get('http://api.test.com/loginUserInfo', () => {
      return HttpResponse.json({
        code: '0000',
        message: null,
        result: { name: 'admin', email: 'admin@gmail.com' }
      })
    })
  )

  beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())

  it('Check request.post - eg. updateUserInfo', async() => {
    const options = { url: 'http://api.test.com/updateUserInfo', method: 'post' }
    const response = { code: '0000', message: null, result: 'success' }
    await expect(request(options)).resolves.toMatchObject(response)
  })

  it('Check request.get - eg. loginUserInfo', async() => {
    const options = { url: 'http://api.test.com/loginUserInfo', method: 'get' }
    const response = { code: '0000', message: null, result: { name: 'admin', email: 'admin@gmail.com' } }
    await expect(request(options)).resolves.toMatchObject(response)
  })

  it('Check request.get - eg. unusableApi', async() => {
    const options = { url: 'http://api.test.com/unusableApi', method: 'get' }
    await expect(request(options)).rejects.toStrictEqual(expect.any(AxiosError))
  })
})
