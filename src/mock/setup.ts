import { toPromise } from 'js-simpler'
import { setupWorker } from 'msw/browser'
import { AppApiBase } from '@/configure/presetEnvironment'

export const promiser = (value: any, delay: number = 300) => {
  return toPromise(delay)
    .then(() => Promise.resolve(value))
    .catch(() => Promise.reject(value))
}

export const resolver = (url: string, regex?: boolean) => {
  const check = /^https?:\/\//i
  const repeat = /^\/*|\/+/g

  if (!check.test(url)) {
    url = (AppApiBase + url).replace(repeat, '/')
  }

  if (url && regex) {
    const format = /[-/\\^$*+?.()|[\]{}]/g
    const source = (url.split('?')[0]).replace(format, '\\$&')
    return new RegExp(source + '(\\?.*)?$')
  }

  return url
}

export const request = () => {
  const printer = async(tag: string) => {
    const log = console.log
    const group = console.group
    const groupEnd = console.groupEnd

    return (printer: (log: any) => void) => {
      log('\n')
      group(`------- 模拟接口 -> ${tag} ---------`)
      printer(log)
      groupEnd()
      log('\n')
    }
  }

  const params = async(req: any) => {
    return req.params
  }

  const query = async(req: any) => {
    const url = req.request.url as string
    const path = url.split('?')[0] as string
    const search = url.substring(path.length)
    const params = new URLSearchParams(search)
    return Object.fromEntries(params)
  }

  const body = async(req: any) => {
    return req.request.clone().json()
  }

  return {
    printer,
    params,
    query,
    body
  }
}

export const runner = () => {
  const worker = setupWorker()

  worker.start({
    serviceWorker: { url: `/msw.js` },
    onUnhandledRequest: 'bypass',
    quiet: true
  })

  return worker
}

export const rester = request()
export const worker = runner()
