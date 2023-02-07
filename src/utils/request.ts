import qs from 'qs'
import Axios, { RawAxiosRequestConfig } from 'axios'
import { AppApiBase } from '@/configure/presetEnvironment'
import Notification from 'ant-design-vue/es/notification'
import useUserStore from '@/store/user'

/**
 * Axios实例
 */
const base = AppApiBase || '/'
const axios = Axios.create({ baseURL: base, timeout: 30000 })
const request = <T = any, D = any>(config: RawAxiosRequestConfig<D>) => {
  return axios(config) as Promise<T>
}

/**
 * 统一异常处理
 */
const requestError = (error: any) => {
  return Promise.reject(error)
}
const responseError = (error: any) => {
  let status = 500
  let message = ''
  const token = useUserStore().token
  const logout = useUserStore().logout

  if (error.toString().indexOf('timeout') > -1) {
    Notification.error({
      message: '系统消息',
      description: '请求超时'
    })
    return Promise.reject(error)
  }

  try {
    status = error.response.status
    message = error.response.data?.message
  } catch (e) {}

  if (status === 403) {
    Notification.error({
      message: '系统消息',
      description: message || '暂无权限'
    })

    return Promise.reject(error)
  }

  if (status === 401) {
    Notification.error({
      message: '系统消息',
      description: message || (token ? 'token已过期' : '暂无权限')
    })

    if (token) {
      logout().then(() => { setTimeout(() => window.location.reload(), 800) })
    }

    return Promise.reject(error)
  }

  if (message) {
    Notification.error({
      message: '系统消息',
      description: message
    })
  }

  return Promise.reject(error)
}

/**
 * 统一拦截处理
 */
axios.interceptors.request.use(
  config => {
    const token = useUserStore().token
    const headers = config.headers

    if (token && !headers.token && headers.token !== null) {
      headers.token = `Bearer ${token}`
    }

    if (headers.token === null) {
      delete headers.token
    }

    return config
  },
  requestError
)
axios.interceptors.response.use(
  response => {
    const status = response.status
    const config = response.config
    const token = useUserStore().token
    const logout = useUserStore().logout

    if (status < 200 || status > 300) {
      return Promise.reject(response)
    }

    if (config.responseType === 'blob' || config.responseType === 'stream' || config.responseType === 'arraybuffer') {
      return response
    }

    if (response.data?.code === 403 || response.data?.code === '403') {
      Notification.error({
        message: '系统消息',
        description: response.data?.message || '暂无权限'
      })

      return Promise.reject(response)
    }

    if (response.data?.code === 401 || response.data?.code === '401') {
      Notification.error({
        message: '系统消息',
        description: response.data?.message || (token ? 'token已过期' : '暂无权限')
      })

      if (token) {
        logout().then(() => { setTimeout(() => window.location.reload(), 800) })
      }

      return Promise.reject(response)
    }

    return response.data
  },
  responseError
)

/**
 * 导出 API
 */
export {
  request,
  qs
}
