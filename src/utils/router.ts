import { Route } from '@/router/generate-typing'

export const extractLink = (route: Route): string => {
  let link

  const path = route.path
  const meta = route.meta || {}
  const query = route.query || {}
  const params = route.params || {}
  const tabRegex = /^\/external\/link(\/.*)?/
  const tablink = '/external/link'

  !tabRegex.test(path)
    ? (link = meta.external)
    : (link = query.from)

  if (link) {
    if (/^file:\/\/\/|^https?:\/\//.test(link)) {
      link = link.replace(/^([^?]*)\/$/, '$1')
      link = link.replace(/^([^?]*)\/(?=\?)/, '$1')
    } else if (/^\/\/\/.+/.test(link)) {
      link = link.replace(/^([^?]*)\/$/, '$1')
      link = link.replace(/^([^?]*)\/(?=\?)/, '$1')
      link = 'file:' + link
    } else if (/^\/\/.+/.test(link)) {
      link = link.replace(/^([^?]*)\/$/, '$1')
      link = link.replace(/^([^?]*)\/(?=\?)/, '$1')
      link = window.location.protocol + link
    } else if (/^\/.+/.test(link)) {
      link = link.replace(/^\//, '')
      link = link.replace(/^([^?]*)\/$/, '$1')
      link = link.replace(/^([^?]*)\/(?=\?)/, '$1')
      link = window.location.protocol + '//' + window.location.host + '/' + link
    } else if (/\w+/.test(link)) {
      link = link.replace(/^([^?]*)\/$/, '$1')
      link = link.replace(/^([^?]*)\/(?=\?)/, '$1')
      link = window.location.protocol + '//' + link
    }

    const urlLink = new URL(link)
    const urlSearch = urlLink.search
    const urlOrigin = urlLink.origin
    const urlParams = new URLSearchParams(urlSearch)
    let urlPathname = urlLink.pathname.replace(/\/+$/, '')

    if (path !== tablink) {
      for (const key in query) {
        if (query[key] !== undefined && query[key] !== null) {
          urlParams.set(key, query[key])
        }
      }

      if (typeof params.path === 'string') {
        urlPathname = urlPathname + '/' + params.path
        urlPathname.replace(/\/+/, '/')
        urlPathname.replace(/\/+$/, '')
      }
    }

    urlParams.sort()
    link = urlOrigin + urlPathname + '?' + urlParams.toString()
  }

  return link || ''
}
