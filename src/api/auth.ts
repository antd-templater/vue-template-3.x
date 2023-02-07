import { request } from '@/utils/request'

/**
 * login 系统登录
 * logout 系统退出
 * modifyPassword 修改密码
 */
const api = {
  login: '/auth/login',
  logout: '/auth/logout',
  modifyPassword: '/auth/modifyPassword'
}

export function login<T = any, D = any>(data: D) {
  return request<T, D>({
    url: api.login,
    method: 'post',
    data: data
  })
}

export function logout<T = any, D = any>(data: D) {
  return request<T, D>({
    url: api.logout,
    method: 'post',
    data: data
  })
}

export function modifyPassword<T = any, D = any>(data: D) {
  return request<T, D>({
    url: api.modifyPassword,
    method: 'post',
    data: data
  })
}

export default api
