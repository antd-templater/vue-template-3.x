import { AppRouterBase, AppApiBase } from '@/configure/presetEnvironment'
import { RestRequest, setupWorker } from 'msw'

export const resolve = (url: string, regex?: boolean) => {
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

export const printer = (title: string) => {
  const log = console.log
  const group = console.group
  const groupEnd = console.groupEnd

  return (printer: (log: any) => void) => {
    log('\n')
    group(`------- 模拟接口 -> ${title} ---------`)
    printer(log)
    groupEnd()
    log('\n')
  }
}

export const params = (req: RestRequest) => {
  return req.params
}

export const query = (req: RestRequest) => {
  return Object.fromEntries(req.url.searchParams.entries())
}

export const body = (req: RestRequest) => {
  return req.clone().json()
}

const worker = setupWorker()
const workerBase = AppRouterBase.replace(/\/+$/, '').replace(/^\/*(.+)/, '/$1')

worker.start({
  serviceWorker: { url: `${workerBase}/msw.js` },
  onUnhandledRequest: 'bypass',
  quiet: true
})

export default {
  worker,
  resolve,
  printer,
  params,
  query,
  body
}
